Vue.component('tasks',{			
		template : `<section class="todoapp">
						 <header class="header">
							<h1>Tareas</h1>
							<input v-on:keyup.enter="addTask" v-model="newTask"type="text"  class="new-todo" placeholder="En que lenguaje estas pensando?">
						 </header>
						 <section>
						 	<div class="">
								<ul class="todo-list">
									<li is="task" v-for="task in tasks"  v-bind:task="task"></li>
								</ul>
							</div>
						 </section>
						 <footer class="footer" v-show="tasks.length">
						 	<span class="todo-count">Completas {{ completedTasks }} | Incompletas {{ incompletedTasks }}</span>
						 </footer>
					</section>`,
		data : function(){
			return{
					newTask : "",
					tasks 	: [
						{ id:1 , title :"Laravel",completed:true},
						{ id:2 , title :"Vue",completed:true},
						{ id:3 , title :"PHP",completed:false}
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
	props: ['task'],
    template: `<li :class="classes">
					<div class="view">
						<input class="toggle" type="checkbox" v-model="task.completed"/>
						<label v-text="task.title" @click="edit()"></label>
						<button class="destroy" @click="remove()"></button>
					</div>
        			<input 
						   v-model="task.title" 
						   @keyup.enter="doneEdit(task.id)" 
						   @blur="doneEdit()"
                           @keyup.esc="cancelEdit()"
        				   class="edit" 
					>
				</li>`
	,
	data: function(){
		return {
			editing : false,
            cacheBeforeEdit : ''
		}
	},
	methods:{
		edit : function(){
			this.cacheBeforeEdit = this.task.title;
			this.editing = true;
		},
		doneEdit : function(id){
			if(! this.task.title){		
				this.remove(id);
			}
			this.editing = false;
		},
		cancelEdit: function(){
			this.editing = false;
			this.task.title = this.cacheBeforeEdit;
		},
		remove: function(id){
			let tasks = this.$parent.tasks;
            tasks.forEach((key)=>{
                if(key.id==id){
                    tasks.splice(tasks.indexOf(this.task),1);
                }
            });
		}
	},
	computed: {
		classes : function(){
			return {
				completed:	this.task.completed,
				editing : this.editing
			};
		}
	}
});	

var app = new Vue({
		el : "#app",	
});	
