// code to build and initialize DB goes here
const bcrypt = require("bcrypt");
const { client } = require("./index");
const { createUser, getAllUsers } = require("./users");
const { createNoteNoCat } = require("./notes_no_cat");
const { createUserTodo } = require("./user_todos");
const { createNotesCategory } = require("./notes_categories");
const { createNoteWithCat } = require("./notes_with_cat");

async function buildTables() {
  try {
    client.query(`
        DROP TABLE IF EXISTS user_todos;
        DROP TABLE IF EXISTS notes_with_cat;
        DROP TABLE IF EXISTS notes_categories;
        DROP TABLE IF EXISTS notes_no_cat;
        DROP TABLE IF EXISTS user_info;
        DROP TABLE IF EXISTS users;
      `);
    console.log("Starting to build tables...");
    await client.query(`
  
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            name VARCHAR(255) NOT NULL,
            admin BOOLEAN DEFAULT FALSE,
            UNIQUE(username, email)
        );

        CREATE TABLE user_info(
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            gender VARCHAR(10),
            age INT NOT NULL,
            birthday DATE NOT NULL,
            UNIQUE(user_id)
        );
        
        CREATE TABLE notes_no_cat(
              id SERIAL PRIMARY KEY,
              user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
              title VARCHAR(255) NOT NULL,
              content TEXT,
              create_date DATE NOT NULL,
              last_edit_date DATE
        );
        
        CREATE TABLE notes_categories(
              id SERIAL PRIMARY KEY,
              user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
              name VARCHAR(255) NOT NULL
        ); 
        
        CREATE TABLE notes_with_cat(
            id SERIAL PRIMARY KEY,
            cat_id INTEGER REFERENCES notes_categories(id) ON DELETE CASCADE,
            title VARCHAR(255),
            content TEXT,
            create_date DATE NOT NULL,
            last_edit_date DATE
      );
          CREATE TABLE user_todos(
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            content VARCHAR(100) NOT NULL,
            active BOOLEAN DEFAULT TRUE
          )
            `);
    console.log("Finished building tables...");
  } catch (error) {
    throw error;
  }
}

const createInitialUsers = async () => {
  console.log("Starting to create initial users...");
  try {
    const adminUser = {
      username: "admin",
      password: await bcrypt.hash("password", 10),
      email: "test@example.com",
      name: "Admin",
      admin: true,
    };
    await createUser(adminUser);
    const usersToCreate = [
      {
        username: "BrianPython",
        password: bcrypt.hashSync("AjaxDestroyer44", 10),
        email: "brian_p@gmail.com",
        name: "Brian Pollygren",
      },
      {
        username: "Shyguy666",
        password: bcrypt.hashSync("appleBoy24", 10),
        email: "shyguy666@yahoo.com",
        name: "Erin Naples",
      },
      {
        username: "Jessica.Troy",
        password: bcrypt.hashSync("AriGorn7747", 10),
        email: "jessica.troy@gmail.com",
        name: "Jessica Troy",
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (err) {
    console.error("There was a problem creating USERS");
    throw err;
  }
};

const createInitialUserTodos = async () => {
  console.log("Starting to create initial user todos...");
  try {
    const todosToCreate = [
      {
        userId: 1,
        content: "Todo Number One",
        active: true,
      },
      {
        userId: 1,
        content: "Todo Number Two",
        active: true,
      },
      {
        userId: 1,
        content: "Todo Number Three (inactive)",
        active: false,
      },
      {
        userId: 2,
        content: "Todo Number Four (inactive)",
        active: false,
      },
      {
        userId: 2,
        content: "Todo Number Five",
        active: true,
      },
    ];
    const todos = await Promise.all(todosToCreate.map(createUserTodo));
    console.log("Todos created:");
    console.log(todos);
    console.log("Finished creating todos!");
  } catch (err) {
    console.error("There was a problem creating TODOS");
    throw err;
  }
};

const createInitialNotesCategories = async () => {
  console.log("Starting to create initial notes categories...");
  try {
    const categoriesToCreate = [
      {
        userId: 1,
        name: "Sad Lyrics",
      },
      {
        userId: 1,
        name: "Happy Lyrics",
      },
      {
        userId: 1,
        name: "Angry Lyrics",
      },
      {
        userId: 2,
        name: "Religious Lyrics",
      },
      {
        userId: 2,
        name: "Wedding Lyrics",
      },
    ];
    const categories = await Promise.all(
      categoriesToCreate.map(createNotesCategory)
    );
    console.log("Notes Categories created:");
    console.log(categories);
    console.log("Finished creating categories!");
  } catch (err) {
    console.error("There was a problem creating CATEGORIES");
    throw err;
  }
};

const createInitialNotesWithCat = async () => {
  console.log("Starting to create initial notes with category...");
  try {
    const notesWithCatToCreate = [
      {
        catId: 1,
        title: "New Note With Category",
        content: "this is my note without category",
      },
      {
        catId: 2,
        title: "New Note With Category 2",
        content: "this is my note with category 2",
      },
      {
        catId: 3,
        title: "New Note With Category 3",
        content: "this is my note without category 3",
      },
      {
        catId: 3,
        title: "New Note With Category 4",
        content: "this is my note with category 4",
      },
    ];
    const notes = await Promise.all(
      notesWithCatToCreate.map(createNoteWithCat)
    );
    console.log("Notes with category created:");
    console.log(notes);
    console.log("Finished creating notes with category!");
  } catch (err) {
    console.error("There was a problem creating notes with category");
    throw err;
  }
};

const createInitialNotesNoCat = async () => {
  console.log("Starting to create initial notes without category...");
  try {
    const notesNoCatToCreate = [
      {
        userId: 1,
        title: "New Note Without Category",
        content: "this is my note without category",
      },
      {
        userId: 1,
        title: "New Note Without Category 2",
        content: "this is my note without category 2",
      },
    ];
    const notes = await Promise.all(notesNoCatToCreate.map(createNoteNoCat));
    console.log("Notes without category created:");
    console.log(notes);
    console.log("Finished creating notes without category!");
  } catch (err) {
    console.error("There was a problem creating notes without category");
    throw err;
  }
};

// const createInitialGuests = async () => {
//   console.log("Starting to create initial guests...");
//   try {
//     const guestsToCreate = [
//       {
//         email: "guest_shopper@yahoo.com",
//         name: "Guest Oneington",
//       },
//       {
//         email: "ilovepcparts@gmail.com",
//         name: "Yoko Homoshito",
//       },
//       {
//         email: "ripper_glover49@gmail.com",
//         name: "Rodney West",
//       },
//     ];
//     const guests = await Promise.all(guestsToCreate.map(createGuest));
//     console.log("guests created:");
//     console.log(guests);
//     console.log("Finished creating guests!");
//   } catch (err) {
//     console.error("There was a problem creating GUESTS");
//     throw err;
//   }
// };

async function rebuildDB() {
  try {
    client.connect();
    await buildTables();
    await createInitialUsers();
    await createInitialNotesNoCat();
    await createInitialUserTodos();
    await createInitialNotesCategories();
    await createInitialNotesWithCat();
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    // console.log("Calling getAllProducts");
    // const products = await getAllProducts();
    // console.log("Result:", products);

    console.log("Calling getAllUsers");
    const users = await getAllUsers();
    console.log("Result:", users);

    // console.log("Calling getProductByType");
    // const productByType = await getProductByType("three");
    // console.log("Result:", productByType);

    // console.log("Calling addProductToCart");
    // const userWithProduct = await addProductToCart(2, 3, 1);
    // console.log("Result:", userWithProduct);

    // console.log("Calling addProductToCart Again");
    // const userWithSecondProduct = await addProductToCart(2, 1, 2);
    // console.log("Result:", userWithSecondProduct);

    // console.log("Calling addProductToCart For Different User");
    // const secondUserWithProducts = await addProductToCart(3, 5, 2);
    // console.log("Result:", secondUserWithProducts);

    // console.log("Calling createUserOrder");
    // const userOrder = await createUserOrder(2);
    // console.log("Results:", userOrder);

    // console.log("Calling createUserAddress");
    // const userAddress = await createUserAddress({
    //   user_id: 1,
    //   street: "167 Milky Way Drive",
    //   street_2: null,
    //   state: "NY",
    //   zip_code: "21188",
    // });
    // console.log("Results:", userAddress);

    // console.log("Calling updateOrderStatus");
    // const orderStatusWithUpdate = await updateOrderStatus(1, {
    //   status: "Processing",
    // });
    // console.log("Results:", orderStatusWithUpdate);

    console.log("Finished database tests!");
  } catch (error) {
    console.log("Error during testDB");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
