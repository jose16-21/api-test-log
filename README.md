
# 1
curl -X GET http://localhost:3000/users

# 2
curl -X GET http://localhost:3000/users/error

# 3
curl -X GET http://localhost:3000/users -H "x-request-id: custom-req-id-001"


# 4
curl -X GET http://localhost:3000/external/200

# 5
curl -X GET http://localhost:3000/external/401

# 6
curl -X GET http://localhost:3000/external/404

# 7
curl -X GET http://localhost:3000/external/500

