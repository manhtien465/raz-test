#!/bin/bash

dockerize -wait tcp://mariadb:3306 -timeout 20s

echo "Start Wait Mysql"
