var Formfy = {};
Formfy.create = function(){
    this.form = document.createElement("form");
    this.form.style.display = 'none';
    return this;
}
Formfy.the = function(property, value){
  this.form[property] = value;
  return this;
}
Formfy.inputs = function(){
  var inputs = [];
  for (var i = 0; i < arguments.length; i+=2) {
    inputs.push(this.input(arguments[i], arguments[i+1]));
  }
  return inputs;
}
Formfy.input = function(name, value){
  var input = document.createElement("input");
  input['type'] = 'text';
  input['name'] = name;
  input['value'] = value;
  return input;
}
Formfy.has = function(input){
  if(input.length){
    for (var i = 0; i < input.length; i++) {
      this.form.appendChild(input[i]);
    };
  }else{
    this.form.appendChild(input);
  }
  return this;
}
Formfy.done = function(){
  document.body.appendChild(this.form);
  return this.form;
}
