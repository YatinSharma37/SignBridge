#!/bin/sh
set -eu

# test.py uses Windows-style paths. Provide Linux-compatible aliases without
# changing the application source.
ln -sf Model/labels.txt 'Model\labels.txt'
ln -sf Model/keras_model.h5 'Model\keras_model.h5'

exec python test.py
