/**
 * @format  
 */

import 'react-native';
import React from 'react';
//import App from '../App';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
//import myFunction from '../components/Admin/CreateSchedule'

isEmptyFeild=(fname,lname,phone,email,password,confirmPassword) =>{
  var result = fname =='' || lname == '' || phone == '' || password == '' || confirmPassword ==''
  return result
}
 doNotmatch = (p1,p2) =>{
   var result = p1!=p2;
   return result
 }
 invalidFirsOrlastName = (fname,lname) =>{
   result= fname.length <2 || lname.length <2
   return result;
 }

 //email address tests
 describe('email address', () => {

   var reg= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

 test('invalid email address missing . in the email', () =>{
   var email= 'm@c'
   var result = reg.test(email)
   expect(result).toBeFalsy();
 })
 
 test('invalid email address missing @ in email ', () =>{
  var email= 'm.c'
  var result = reg.test(email)
  expect(result).toBeFalsy();
})

test ('valid email address', () =>{
  var email= 'may@gmail.com'
  var result = reg.test(email)
  expect(result).toBeTruthy(); 
})

test('invalid email , all letters', () =>{
  var email= 'abcdefg'
  var result = reg.test(email)
  expect(result).toBeFalsy();
})

test('invalid email , all numbers', () =>{
  var email= ('123456')
  var result = reg.test(email)
  expect(result).toBeFalsy();
})

/*test('valid email , space before email address', () =>{
  var email= (' may@gmail.com')
  var result = reg.test(email)
  expect(result).toBeTruthy();
})*/

/*test('valid email , space after email address', () =>{
  var email= ('may@gmail.com ')
  var result = reg.test(email)
  expect(result).toBeTruthy();
})*/

test('invalid email , has @ and . but no other characters', () =>{
  var email= ('@.')
  var result = reg.test(email)
  expect(result).toBeFalsy();
})
 })

 describe('empty field tests', () =>{

test('empty entry, one entry is empty', () =>{
  var fname ='';
  var lname='Derbas';
  var phone ='1234567890';
  var password='1234';
  var confirmPassword='1234';
  var email ='a@b.c';
  var emptyFeild=isEmptyFeild(fname,lname,phone,email,password,confirmPassword)

  expect(emptyFeild).toBeTruthy();
})

test('empty entry, some entries are empty', () =>{
  var fname ='';
  var lname='Derbas';
  var phone ='';
  var password='';
  var confirmPassword='1234';
  var email ='a@b.c';
  var emptyFeild=isEmptyFeild(fname,lname,phone,email,password,confirmPassword)

  expect(emptyFeild).toBeTruthy();
})

test('empty entry, all entries are empty', () =>{
  var fname ='';
  var lname='';
  var phone ='';
  var password='';
  var confirmPassword='';
  var email ='';
  var emptyFeild=isEmptyFeild(fname,lname,phone,email,password,confirmPassword)

  expect(emptyFeild).toBeTruthy();
})
 })

describe('phone number tests', () =>{
let regPhone = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;

test ('invalid phone number , less than 10 digits', () =>{
  var phoneNumber ='123'
  var result = regPhone.test(phoneNumber)
  expect(result).toBeFalsy();
})

test ('invalid phone number , letters', () =>{
  var phoneNumber ='abc'
  var result = regPhone.test(phoneNumber)
  expect(result).toBeFalsy();
})

  test ('invalid phone number , letters and numbers', () =>{
  var phoneNumber ='123abc'
  var result = regPhone.test(phoneNumber)
  expect(result).toBeFalsy();
})

test ('invalid phone number with format missing one digit', () =>{
  var phoneNumber ='(123) 123-123'
  var result = regPhone.test(phoneNumber)
  expect(result).toBeFalsy(); 
})

test ('valid phone number with format no spacing', () =>{
  var phoneNumber ='(123)123-1234'
  var result = regPhone.test(phoneNumber)
  expect(result).toBeTruthy(); 
})

test ('valid phone number, no format, no spacing', () =>{
  var phoneNumber ='1234567890'
  var result = regPhone.test(phoneNumber)
  expect(result).toBeTruthy(); 
})

/*
test ('valid phone number, no format, spacing', () =>{
  var phoneNumber ='123 156 7890'
  var result = regPhone.test(phoneNumber)
  expect(result).toBeTruthy(); 

})

test ('valid phone number, with format, spacing', () =>{
  var phoneNumber ='(123) 156-7890'
  var result = regPhone.test(phoneNumber)
  expect(result).toBeTruthy(); 
})
*/
})
describe('password and confirm password testing', () =>{

  test('invalid password, less than 5 characters', () =>{
     var password= '1'
     result = password.length < 5
     expect(result).toBeTruthy();
  })

  test('valid password, number 5 digits', () =>{
    var password= '12345'
    result = password.length < 5
    expect(result).toBeFalsy();    
 })

 test('valid password, 6 letters', () =>{
  var password= 'abcdefg'
  result = password.length < 5
  expect(result).toBeFalsy();    
})

test('password does not match confirm password', () => {
  var password ='12345'
  var confirmPassword ='1234'
  result=doNotmatch(password,confirmPassword)
  expect(result).toBeTruthy();
})

test('password matches confirm password', () => {
  var password ='12345'
  var confirmPassword ='12345'
  result=doNotmatch(password,confirmPassword)
  expect(result).toBeFalsy();
})
/*
test('password matches confirm password, white space at of the begining of password', () => {
  var password =' 12345'
  var confirmPassword ='12345'
  result=doNotmatch(password,confirmPassword)
  expect(result).toBeFalsy();
})*/
})

describe('first name and last name tests', () =>{

test('invalid first name, less than 3 characters', () =>{
  var fname='a'
  var lname='Derbas'
  result = invalidFirsOrlastName(fname,lname)
  expect(result).toBeTruthy();
})

test('invalid last name, less than 3 characters', () =>{
  var fname='May'
  var lname='d'
  result = invalidFirsOrlastName(fname,lname)
  expect(result).toBeTruthy();
})

test('invalid first name, invalid last name, less than 3 characters', () =>{
  var fname='Ma'
  var lname='d'
  result = invalidFirsOrlastName(fname,lname)
  expect(result).toBeTruthy();
})
test('valid first name, valid last name',() =>{
  var fname='MaY'
  var lname='Derbas'
  result = invalidFirsOrlastName(fname,lname)
  expect(result).toBeFalsy();
})

})



