const express = require("express");

//apploserver is ue for graphql query 
const { ApolloServer } = require("@apollo/server");
const {USER} = require("./user");
const {TODO} = require('./todo')
//Middleware  required
const { expressMiddleware } = require("@apollo/server/express4")

//
const bodyparser = require("body-parser")
const cors = require("cors")
const axios = require('axios');

async function startServer() {
    const app = express();
    //resolver and typedef jyare multiple table hoy tyare biji file ma banavi sakay...

    //create appollo server... in this appolloserver we add configuration

    //graphql na use mate graphql server ne khaber hovi joiye k tame kaya kaya operation prform karvana chhho jevirite express ma routes banavo chho evi rite ama appolloserver ma schema banaviye chhiye
    const server = new ApolloServer({
        //typedef string ma hoy chhe 
        typeDefs: `
        type User {
          id:ID!
          name:String!
          username:String!
          email:String!
          phone:String!
          website:String!
         }
          type Todo {
           id:ID!
           title:String!
           completed:Boolean
           userId:ID
           user:User
          }

          type Query{
              getTodos:[Todo]
              getAllUser:[User]
              getUserBYId(id:ID!):User
          }
        `,

        //id chhe first schma ma jene apne numver type chhe to id pan kahi sakiye chhiye..
        // ! ni matlap chhe e required feild chhe 
        //Query means tamare graph ql na server mathi kai fetch karvu chhe to query karo chho.te array return kare todo valo.
        //kai apvu chhe to nutation karo chho

        resolvers: {
            //apde ahi userId uper thi data lavava user ne todo ma lagavyu pan kaya todo no kayo user chhe
            //e janava apne below code lakhisu 

            Todo: {
                // todo ma user hase eni mate todo ma userid pan define karvi padse and and byid valo ahi return karavnu...
                // user: async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo?.userId}`)).data,
                // ama  todo>usetid etle k todo ni je suerId chhe eno data joiye che 


                user:(todo)=>USER.find((user) => user.id == todo?.userId)
            },
            //perform databse operations we use this  atyare databse nathi etle json place 
            Query: {
                //Jayare api call karvani hati tyare aa method use hse have direct data mate aa nicheni method no use thse

                // getTodos: async () =>

                //     //ahi logic j avse query ne evu j 
                //     //  [
                //     // Aa below metod no use static data get karva karyo hato have axios thi karisu
                //     // {id:1,title:"first data",completed:false}

                // (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,

                getTodos: () => TODO,
                //For get use we use below method
                // getAllUser: async () => (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
                getAllUser: () => USER,

                // getUserBYId: async (parent, { id }) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
                getUserBYId: async (parent, { id }) => USER.find((user) => user.id == id)

                // In above i get data using axios and retun data using .data 
                // ]
            }
        }
        //reolvers and typedef apvi complosary chhe..
    });

    //middleware use 
    app.use(bodyparser.json());
    app.use(cors());

    //server start karvu padse
    await server.start();

    //koi request graphql thi ave chhe to ene express middleware handle kare chhe middleware ma server
    //-pass thase.....
    app.use("/graphql", expressMiddleware(server))
    app.listen(8000, () => console.log("Server started at port 8000"))
}

startServer()

//nodemon thi run karva forst aa command install karvo

// npm install nodemon --save-dev

//pachhi package.json ma aa add karvu scripts
// "scripts": {
//     "dev": "nodemon server.js"
//   },


//uper nu karya pachhi tame http://localhost:8000/graphql aa karso etle servar ma run thase graphql server


//after that in query print query
// query getAllTodods { // name of query which you wnat to give
//     getTodos {// type of query which you define in typedef
//       title  //which you wan to get pls write
//     }
//   }


//Using above we are not able to get data because we not describe anything in resolver because we write
//logic in resolver in type we define types..

//Atyare marte  jyare user logic mate jyare user get todos k tyar e static data mukyo chhe

// {
//   "data": {
//     "getTodos": [
//       {
//         "title": "firts data"
//       }
//     ]
//   }
// }

//Resolver ma logic lakhis pachhi mane aa rite data malse pela null malta hata...
//je data get karva mate mukyu chhe em data malse >> jo id and completed mukis to e pan malse..

// I hope you’re doing well. I interviewed for the MERN Stack Developer position at [Company Name] last week and wanted to kindly ask if there’s any update regarding the status of my application. Thank you!


//Jyare multiple table hoy tyare resolver and typedef alag file ma banse

//typedef ma jetla table chhe eni type relation and kai type ni query chhe e mlase

// jyare resolver ma logic avse qyuery avse tamare je dta find karvo chhe je query banava mango cho e tya j avse >>>