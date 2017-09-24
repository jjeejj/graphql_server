const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} = require("graphql");
const axios = require("axios");
// const customers = [
//     {id:"1",name:"test",age:2,email:"232sss44@qq.com"},
//     {id:"2",name:"wen",age:20,email:"23244ss@qq.com"},
//     {id:"3",name:"lanl",age:13,email:"2fg3244@qq.com"},
//     {id:"4",name:"hello",age:33,email:"23gfg244@qq.com"},
//     {id:"5",name:"jack",age:53,email:"2gf3244@qq.com"},
//     {id:"6",name:"tom",age:8,email:"23244gfg@qq.com"},
// ]

const CustomerType = new GraphQLObjectType({
  name: "CustomerType",
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  }
});

//root rootQuery
const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parenVal, args) {
        // for(let customer of customers){
        //     if(customer.id == args.id){
        //         return customer;
        //     }
        // };

        return axios
          .get("http://localhost:3000/users/" + args.id)
          .then(res => res.data);
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parenVal, args) {
        return axios.get("http://localhost:3000/users/").then(res => res.data);
      }
    }
  }
});
//增删改查
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        age: {
          type: GraphQLInt
        }
      },
      resolve(parenVal, args) {
        return axios
          .post("http://localhost:3000/users/", args)
          .then(res => res.data);
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
          id:{
              type: new GraphQLNonNull(GraphQLString)
          }
      },
      resolve(parenVal, args) {
          return axios.delete("http://localhost:3000/users/"+args.id,args).then(res=>res.data);
      }
    },
    editeCustomer: {
      type: CustomerType,
      args: {
          id:{
              type: new GraphQLNonNull(GraphQLString)
          },
          name: {type :GraphQLString},
          email: {type :GraphQLString},
          age: {type :GraphQLInt},

      },
      resolve(parenVal, args) {
          return axios.patch("http://localhost:3000/users/"+args.id,args).then(res=>res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation
});
