#!/bin/sh
echo -ne '\033c\033]0;cooperativRP\a'
base_path="$(dirname "$(realpath "$0")")"
"$base_path/Server_cooperativRP.x86_64" "$@"
