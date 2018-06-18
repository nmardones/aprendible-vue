Vue.component('tasks',{		
		template : `<div>
						<h1>Lista de Tareas </h1>
						<ul>
							<h3>Tareas Completas {{ completedTasks }}</h3>
							<h3>Tareas Incompletas {{ incompletedTasks }}</h3>
							<li is="task" v-for="task in tasks"  v-bind:task="task"></li>
							<li class="form-inline">
								<input v-on:keyup.enter="addTask" v-model="newTask"type="text" class="form-control">
							</li>
						</ul>
					</div>`,
		data : function(){
			return{
					newTask : "",
					tasks 	: [
						{ title :"Laravel",completed:true},
						{ title :"Vue",completed:true},
						{ title :"PHP",completed:false}
					]
			} 
		},
		methods : {
				reverse : function(){
					this.message = this.message.split('').reverse().join('')
				},
				addTask : function(){
					if(this.newTask.length <= 1) return alert("la Tarea no puede estar Vacia!");
					this.tasks.push({
						title :  this.newTask,
						completed : false
					});
					this.newTask = "";	
				}
			},			
		computed : {
			completedTasks: function(){
				return 	this.tasks.filter(function(task){
					return task.completed;
				}).length;		
			},
			incompletedTasks: function(){
				return 	this.tasks.filter(function(task){
					return ! task.completed;
				}).length;		
			}	
		}			
});
Vue.component('task',{
	props : ['task'],
	template : `<li>
					<span v-text="task.title"></span>
					<span @click="completedTask()" v-bind:class="taskClases"></span>
				</li>`	
	,
	methods : {
		completedTask : function(){
			return this.task.completed = ! this.task.completed
		}
	},
	computed: {
		taskClases : function(){
			return ['glyphicon', this.task.completed ? 'glyphicon-check' : 'glyphicon-unchecked']
		}
	}
});

var app = new Vue({
		el : "#app",	
});
