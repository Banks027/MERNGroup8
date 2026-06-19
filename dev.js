// dev-seed.js

// 1. Define and switch to your development database
const dbName = "dev_database";
const myDb = db.getSiblingDB(dbName);

print(`--- Starting Dev Script on Database: ${dbName} ---`);

// 2. Drop existing collection to start fresh (Optional)
myDb.users.drop();
print("Dropped old 'users' collection.");

// 3. Define seed mock data
const mockUsers = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    createdAt: new Date()
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    role: "User",
    createdAt: new Date()
  },
  {
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "User",
    createdAt: new Date()
  }
];

// 4. Wrap database operations in a try-catch for error handling
try {
  // Insert data
  const insertResult = myDb.users.insertMany(mockUsers);
  print(`Successfully seeded ${insertResult.insertedCount} users!`);

  // 5. Create indexes to optimize queries
  myDb.users.createIndex({ email: 1 }, { unique: true });
  print("Unique index created on 'email' field.");

  // 6. Verify and output results into a readable table
  const totalRecords = myDb.users.countDocuments();
  print(`Verification: Total records now in 'users' = ${totalRecords}`);

  const activeUsers = myDb.users.find({ role: "User" }).toArray();
  console.table(activeUsers);

} catch (error) {
  print(`An error occurred during execution: ${error.message}`);
  quit(1); // Terminate script with an error code
}

print("--- Dev Script Completed Successfully ---");
quit(0); // Exit shell clean
