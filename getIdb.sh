#!/bin/bash

# Parse command line options.
while getopts o:n: flag
do
    case "${flag}" in
        o) owner=${OPTARG};;
        n) name=${OPTARG};;
    esac
done

# Convert to lowercase and concatenate
concat_string="$(echo -n "${name}" | tr '[:upper:]' '[:lower:]')$(echo -n "${owner}" | tr '[:upper:]' '[:lower:]')"

# Compute SHA-224 hash
echo -n "${concat_string}" | openssl dgst -sha224 | awk '{print $2}'
