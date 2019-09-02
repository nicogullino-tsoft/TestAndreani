#!/bin/bash

# Debe ser invocado desde el root del proyecto

SRC_DIR=.
TARGET_DIR=$SRC_DIR/dockerfiles/devscore

mkdir -p $TARGET_DIR

cp -R $SRC_DIR/src $TARGET_DIR
cp -R $SRC_DIR/styles $TARGET_DIR

cp $SRC_DIR/.babelrc $TARGET_DIR
cp $SRC_DIR/.jshintrc $TARGET_DIR
cp $SRC_DIR/package.json $TARGET_DIR
cp $SRC_DIR/package-lock.json $TARGET_DIR
cp $SRC_DIR/postcss.config.js $TARGET_DIR
cp $SRC_DIR/semantic.json $TARGET_DIR
cp $SRC_DIR/webpack.config.js $TARGET_DIR
cp $SRC_DIR/webpack.loaders.js $TARGET_DIR
cp $SRC_DIR/webpack.production.config.js $TARGET_DIR
cp $SRC_DIR/yarn.lock $TARGET_DIR
cp $SRC_DIR/tsconfig.json $TARGET_DIR
cp $SRC_DIR/tsconfig.production.json $TARGET_DIR

docker build -f $SRC_DIR/dockerfiles/Dockerfile -t devscore-frontend $TARGET_DIR
STATUS=$?
rm -R $TARGET_DIR
echo $STATUS
exit $STATUS