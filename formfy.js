function Formfy(){
  var form = document.createElement("form");
  form.style.display = 'none';

  this.with = {
    attribute : function(name, value){
      form.setAttribute(name, value);
      return this;
    },
    action : function(action){
      this.attribute("action", action);
      return this;
    },
    method : function(method){
      this.attribute("method", method);
      return this;
    },
    get: function(){
      this.attribute("method","get");
      return this;
    },
    post: function(){
      this.attribute("method","post");
      return this;
    },
    patch : function(){
     return this.post().input({
        type : "_method",
        value : "patch"
      });
    },
    put : function(){
     return this.post().input({
        type : "_method",
        value : "put"
      });
    },
    delete : function(){
     return this.post().input({
        type : "_method",
        value : "delete"
      });
    },
    id : function(id){
      this.attribute("id", id);
      return this;
    },
    input: function(attributes){
      var input = document.createElement("input");
      for(var attribute in attributes){
        input.setAttribute(attribute, attributes[attribute]);
      }
      form.appendChild(input);
      return this;
    },
    inputs : function(){
      for (var i = 0; i < arguments.length; i++){
        var arg = arguments[i];
        this.input(arg);
      }
      return this;
    },
    text : function(name, value){
      var skeleton = {
        type: "text", name : name, value : value || ''
      };
      return this.input(skeleton);
    },
    checkbox : function(name, value){
      var skeleton = {
        type: "checkbox", name : name, value : value || ''
      };
      return this.input(skeleton);
    },
    button : function(value){
      var skeleton = {
        type: "button", value : value
      };
      return this.input(skeleton);
    },
    password : function(name, value){
      var skeleton = {
        type: "password", name : name, value : value || ''
      };
      return this.input(skeleton);
    },
    radio : function(name, value){
      var skeleton = {
        type:"radio", name : name, value: value
      };
      return this.input(skeleton);
    },
    select : function(name, fn){
      var selectfy = new Selectfy(name);
      fn.call(selectfy, selectfy);
      form.appendChild(selectfy.with.select());
      return this;
    },
    done : function(){
      return form;
    }
  }
}

function Selectfy(name){
	var select = document.createElement('select');
	select.name = name;
	
	this.with = {
		options : function(){
			for (var i = 0; i < arguments.length; i++){
				var arg = arguments[i];
        if(!arg['text']) throw ReferenceError("Text for option is not defined");
				this.option(arg, arg['text']);
			}
			return this;
		},
		option : function(value, text){
			var arg = typeof value == "string" ? { value :  value} : value;
			var option = document.createElement('option');
      if(!text) throw ReferenceError("Text for option is not defined");
      option.appendChild(document.createTextNode(text));
			for(var attribute in arg){
				option.setAttribute(attribute, arg[attribute]);
			}
			select.appendChild(option);
			return this;
		},
		select : function(){
			return select;
		}
	}
}
