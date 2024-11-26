# graphql
<!-- graph ql server run arva localhist port and pai ma  hhe lahyucheh address ap lakhvu server ma  -->
<!-- EXAMPLE : localhost:8000/graphql -->

1)Graphql >>
>>graphql is query language one type 

1. GraphQL:
What it is: A query language for APIs that allows clients to request specific data from the server.
How it works: Instead of making multiple requests for different pieces of data, with GraphQL, you can send one query and specify exactly which fields you need. It’s flexible, as clients can request only the data they need.
Key Benefit: You don’t need to over-fetch or under-fetch data. It's client-driven.
2)What is RestApi 
>>We create request for get particular todo list or response.
>>Because anathi tamare khali title j joiye chhe pan e badha data ape chhe je tamare require nathi jethi
tamare network ni bandwidth vadhi jay chhe 

problems:- without graphql >>
===============================
>>Badha alag alag client ni requirement alag alag chhe to pan temne same data apiye chhiye to network ni
bandwidth waste thay chhe
>>ema pachhi e to to ma mane je user id male chhe e data user table mathi joiye chhe 
>>user/id thi e malse >> jethi user table mathi mare name j joiye chhe pan badha data malse 
>>To rest api no data vadharano an male chhe jeni need nathi....

>>Jyare restApi ni badle Graphql thi data lavena hoy tyare client specify karse k ene kaya data joiye 
chhe...

>>Graphql ma mare specify karvu padse request vakhte k mare su joiye chhe 
>>First hu request karis k mare todos joiye chhe jema title hoy >> graphql srever aa read karine only
  Title j return karse....

>>Example : todos{
               title
            }

 >>Uper mare todo and e todo kone banavyo e data lava alag alag request moklvi oadti hati
 >>todo banavyou chhe e data use_id uperthi lavava alag api call karavi hati
 >>Graph ql thi ek j query thi data malse 
 >>Example :  
       todos {
        title 
        user
        {
         name
        }
        }

>>How to make directory for graphql project 
>>For graphql we use appoloframwork for request response
>>document mathi appoloserver setup karvu >> applograhql.com >>https://www.apollographql.com/docs/

>>npm install @apollo/server graphql
>>bodyparser and cors install karvu 

>>stayis cuery karya pachii direct resonse api thi data fetch karva axios no use thase
>>To karo npm i axios 
>>After that axios types pan karvi pade chhe @types/axios install kro.
>>Means k resolver m table no data json store thase jeni user mare query perform kari chhe 
>>typedef ma >> data base table na type write thase and qury kaya type ni hase e lakhase 
>>resolver >> resolver ma tamari qury kogic lakahse tamare kai kai query avse e 
>>je query nu logic relolver ma avese e query as a type of query tarike typeDef ma batavi padse..

<!-- get BY id ma data mate ahi query ma id pass kari and user return karse and front ni requetsi ene resolver ma parent and id malse jethi e function ne call karse.. -->

<!-- Appolo server bodyData how to pass when we wan to find getById data..-->

1)first in applolloserver bellow valuable part pass id in body data
>>{
  "getUserId":"3"
}
2)In second in query part pass this user id in geAllTodos  and aftre this call query of typedef and pass id on this typedef and also defune in getbyId what yiu want
query getAllTodods($getUserId:ID!) {
  getUserBYId(id:$getUserId){
    username
  }
}

3)We can also able to fetch 2 data in one queryyy
>>query getAllTodods($getUserId:ID!){
  getTodos {
    completed
    userId
  }

getUserBYId(id: $getUserId) {
  name
}}

>>gtUserId define in below varipal part in graphql server

>>3)ahi typeDef ma  
  type Todo {
           id:ID!
           title:String!
           completed:Boolean
           userId:ID!
          } user id ni jagyae user find karvano becasue eno data user table mathi levano chhe eno type use chhe to

 >4)Example of query if i wantto get todo data based on userId
  >>query getAllTodods{
  getTodos {
    title
    userId
    completed
    user{
      name
      id
    }
  }
}     

5)now backend ma ap call na badle simple js file banavi ne e file ne import karine emathi data find karisu
