#!/bin/bash

# This script validates and parses a commit/PR title provided as an argument.
# The title is expected to be one of the following format:
#   - <type>(<scope>): <description>
#   - <type>: <description>
#
# It extracts and sets the following environment variables:
#  - KEYWORD:      The commit/PR type (e.e., `feat`, `fix`).
#   - SCOPE:        The scope without surrounding parentheses (if provided).
#   - DESCRIPTION:  The description after the colon.
#   - MESSAGES:     A log of messages generated during validation.
#
# Usage:
#   ./parse-title.sh "your title string"
#

echo "Parsing title..."

# Retrieve the title from the first argument.
TITLE="$1"

# Ensure a title was provided.
if [ -z "$TITLE" ]; then
  echo "❌ Title not provided, Please pass a title as the first argument." >&2
  exit 1
fi

# Global variable to collect messages.
MESSAGES=""

# Log messages by appending it to MESSAGES variable.
log_message() {
  MESSAGES+="$1"$'\n'
}

validate_syntax() {
  local title="$1"
  # Ideally, a non-capturing group would be used for the optional scope
  # since the scope itself needs to be captured not the surrounding parentheses.
  # However, some OSs do not support non-capturing groups in bash.
  # As a workaround, this pattern captures the scope including its parentheses
  # which are removed later.
  # For environments that support non-capturing groups, you could use:
  # pattern='^([a-z]+)(?:(\([A-Za-z0-9]+\)))?: (.+)$'
  local pattern='^([a-z]+)(\([A-Za-z0-9]+\))?: (.+)$'

  if [[ ! "$title" =~ $pattern ]]; then
    log_message "❌Invalid title format."
    log_message "🔍Expected: <type>(<scope>): <description> or <type>: <description>"

    # Debugging: Check where it failed.
    if ! [[ "$title" =~ ^[a-z]+ ]]; then
      log_message "🔍Keyword is missing or now lowercase"
    fi

    if ! [[ "$title" =~ \(([A-Za-z0-9/-]+)\) ]]; then
      log_message "🔍Scope, if provided, must be enclosed in a parentheses and contain valid characters. (Optional)"
    fi

    if ! [[ "$title" =~ :\  ]]; then
      log_message "🔍The colon separator is missing or incorrect."
    fi

    if ! [[ "$title" =~ :\ (.+)$ ]]; then
      log_message "🔍 Description is missing after ':'."
    fi

    return 1
  else

    KEYWORD="${BASH_REMATCH[1]}"

    local raw_scope="${BASH_REMATCH[2]}"

    # If raw scope is non-empty, remove surrounding parentheses.
    if [[ -n "$raw_scope" ]]; then
      raw_scope="${raw_scope#\(}" # Remove leading '('
      raw_scope="${raw_scope%\)}" # Remove trailing ')'
    fi

    SCOPE="$raw_scope"
    DESCRIPTION="${BASH_REMATCH[3]}"

      if [[ ! "$DESCRIPTION" =~ ^[A-Z] ]]; then
        log_message "🔍Description must start with a capital letter."
        return 1
      fi

    log_message "✅Valid title format."
    log_message "ℹ️**KEYWORD**: $KEYWORD"
    log_message "ℹ️**SCOPE**: $SCOPE"
    log_message "ℹ️**DESCRIPTION**: $DESCRIPTION"
  fi

  return 0
}

validate_semantics() {
  local validation_yaml="infra/config/validation.yaml"

  local keyword_exists
  keyword_exists="$(yq e ".allowed_keywords[] | select(.name == \"$KEYWORD\") | .name" "$validation_yaml")"

  if [[ -z "$keyword_exists" ]]; then
    log_message "❌ Invalid keyword: $KEYWORD"

    local allowed_keywords_csv
    allowed_keywords_csv="$(yq e ".allowed_keywords[].name" "$validation_yaml" | paste -sd ',' -)"
    log_message "ℹ️Allowed keywords are: $allowed_keywords_csv"

    return 1
  fi

  local keyword_requires_scope
  keyword_requires_scope="$(yq e ".allowed_keywords[] | select(.name == \"$KEYWORD\") | .requires_scope" "$validation_yaml")"

  if [[ "$keyword_requires_scope" == "true" ]]; then
    if [[ -z "$SCOPE" ]]; then
      log_message "❌ The keyword '$KEYWORD' requires a scope, but none was provided."
      return 1
    fi

    # Check allowed scopes
    local allowed_scopes
    allowed_scopes="$(yq e ".allowed_keywords[] | select(.name == \"$KEYWORD\") | .scopes[]" "$validation_yaml")"

    if ! echo "$allowed_scopes" | grep -qx "$SCOPE"; then
      local allowed_scopes_csv
      allowed_scopes_csv="$(yq e ".allowed_keywords[] | select(.name == \"$KEYWORD\") | .scopes[]" "$validation_yaml")"

      log_message "❌Scope '$SCOPE' is not in the allowed scopes for keyword '$KEYWORD'."
      log_message "ℹ️Allowed scopes are:$allowed_scopes_csv"
      return 1
    fi

  # requires_scope == "false"
  else
    if [[ -n "$SCOPE" ]]; then
      log_message "ℹ️The keyword '$KEYWORD' does not require a scope, but one was provided scope '$SCOPE'."
    fi
  fi
}

validate_syntax "$TITLE" || return 1
validate_semantics || return 1

return 0