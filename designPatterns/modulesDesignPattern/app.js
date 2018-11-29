const myNameSpace = window.myNameSpace || {}; //fallback option
// MODULES design pattern IIFEs
// 1. create private members
// 2. return object
myNameSpace.module = (function(){
  //private Members
  let privateProperty1 = true;
  const checker = [1, 2, 3];
  function publicReturnCheck (){
    console.log("it's been returned");
  }

  //return
  return{
    //public Members
    publicProperty: false,
    publicProperty2 : 7,
    publicMethod: function(){ //I take advantage of outerEnvironment surrounding my publicReturnCheck function to get access to private members
      return publicReturnCheck();
    },
    publicMethod2: function(){
      console.log(privateProperty1);
    }
  }
})();
myNameSpace.module.publicMethod();
myNameSpace.module.publicMethod2();
