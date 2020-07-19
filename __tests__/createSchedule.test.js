import 'react-native';
import React from 'react';
//import App from '../App';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
//import myFunction from '../components/Admin/CreateSchedule'

isEmptyFeild=(p1,p2,p3,p4,p5) =>{
  var result = p1 =='' || p2 == '' || p3 == '' || p4 == '' || p5 ==''
  return result
}
getCurrentDate=() =>{
    var today= new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    if (month < 10) {
      month = '0' + month;
    }
    if (day< 10) {
      day = '0' + day;
    }

    var currentDate = year + '-' + month + '-' + day;
    return currentDate
}
isValidDate=(date) =>{
    var currentDate= getCurrentDate();
    var result = date > currentDate;
    return result
}

describe('empty field tests', () =>{

    test('empty entry, one entry is empty', () =>{
      var id ='';
      var guardName='May Derbas';
      var site ='Costco';
      var shift='9 am- 5 pm';
      var date='2020-07-30';

      var emptyFeild=isEmptyFeild(id,guardName,site,shift,date)
    
      expect(emptyFeild).toBeTruthy();
    })

    test('empty entry, some entries are empty', () =>{
        var id ='';
        var guardName='May Derbas';
        var site ='Costco';
        var shift='';
        var date='';
  
        var emptyFeild=isEmptyFeild(id,guardName,site,shift,date)
      
        expect(emptyFeild).toBeTruthy();
      })

      test('empty entries, all entries are empty', () =>{
        var id ='';
        var guardName='';
        var site ='';
        var shift='';
        var date='';
  
        var emptyFeild=isEmptyFeild(id,guardName,site,shift,date)
      
        expect(emptyFeild).toBeTruthy();
      })

      test('no empty entries, all selected', () =>{
        var id ='1234f3r7hhywt678whw88';
        var guardName='May Derbas';
        var site ='Costco';
        var shift='9 am- 5 pm';
        var date='2020-08-11'; 
  
        var emptyFeild=isEmptyFeild(id,guardName,site,shift,date)
      
        expect(emptyFeild).toBeFalsy();
      })
    })
 
      describe('Date tests', () =>{

        test('invalid date in the past', () =>{
          var date = '2020-05-11'
          var result = isValidDate(date)
          expect(result).toBeFalsy();
        })
        
        test('valid date ', () =>{
            var date = '2020-08-11'
            var result = isValidDate(date)
            expect(result).toBeTruthy();
          })
    })




      


