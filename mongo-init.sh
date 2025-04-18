#!/bin/bash
echo "Waiting for MongoDB to start..."
sleep 10

mongosh --host mongo1:27017 <<EOF
config = {
  "_id": "myReplicaSet",
  "members": [
    { "_id": 0, "host": "mongo1:27017", "priority": 2 },
    { "_id": 1, "host": "mongo2:27017", "priority": 1 },
    { "_id": 2, "host": "mongo3:27017", "priority": 1 }
  ]
}

rs.initiate(config)
EOF

echo "MongoDB Replica Set initialized"
sleep 5

# Verify replica set status
mongosh --host mongo1:27017 --eval "rs.status()"