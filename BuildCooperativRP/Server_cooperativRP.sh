#!/bin/sh
printf '\033c\033]0;%s\a' cooperativRP
base_path="$(dirname "$(realpath "$0")")"
"$base_path/Server_cooperativRP.x86_64" "$@"
