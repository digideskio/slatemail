global.document= window.document;
global.navigator = window.navigator;
var $ = require('jquery');
var Q = require('Q');
var MessageView = require('../modules/messageView.js');
var DbHandler = window.dbHandler;
var React = require('react');

var ProjectListReact = React.createClass({displayName: "ProjectListReact",
	getInitialState: function(){
		return {data:[]};
	},
	render: function(){
		console.log('RENDER THAT SHIT');
		console.log(this.props);
		var project_item_nodes = this.props.data.map(function(project_name){
				return (
					React.createElement(ProjectItem, {key: project_name, data: project_name})
				);
			});
		console.log(project_item_nodes);
		return (
			React.createElement("div", {className: "project_list"}, 
				project_item_nodes
			)
			);
	}
});
var ProjectItem = React.createClass({displayName: "ProjectItem",
	render: function(){
		var project_data = this.props.data;
		return (
			React.createElement("div", {className: "project_item", "data-project-id": project_data}, project_data)
		);
	}
});

function ProjectList(container, conf){
	this.container = container;
	this.conf = conf;
	this.dbHandler = new DbHandler();
	this.render();
	this.addEventListeners();
}
ProjectList.prototype = {
	render:function(){
		var self = this;
		this.dbHandler.listProjects()
			.then(function(project_names){
				console.log(project_names);
				console.log("GO PROJECT LIST REACT");
				React.render(React.createElement(ProjectListReact, {data: project_names}), self.container[0]);
			});
	},
	addEventListeners:function(){
		var self = this;
		this.container.on('click','.project_item', function(){
			var project_id = $(this).data('project-id');
			if(self.conf.onSelection){
				self.conf.onSelection(project_id);
			}
		});
	}
};
module.exports = ProjectList;