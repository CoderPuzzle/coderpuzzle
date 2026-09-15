// One vector indexed by the sequential task id (index = id - 1) holds
// every task; the getters scan it for the user's uncompleted tasks and
// sort the survivors by their unique due date.
struct TodoTask {
    user: i32,
    description: String,
    due: i32,
    tags: Vec<String>,
    done: bool,
}

pub struct TodoList {
    tasks: Vec<TodoTask>,
    next_id: i32,
}

impl TodoList {
    pub fn new() -> Self {
        TodoList {
            tasks: Vec::new(),
            next_id: 1,
        }
    }

    pub fn addTask(&mut self, userId: i32, taskDescription: String, dueDate: i32, tags: Vec<String>) -> i32 {
        let id = self.next_id;
        self.next_id += 1;
        self.tasks.push(TodoTask {
            user: userId,
            description: taskDescription,
            due: dueDate,
            tags,
            done: false,
        });
        id
    }

    pub fn getAllTasks(&mut self, userId: i32) -> Vec<String> {
        self.collect(userId, None)
    }

    pub fn getTasksForTag(&mut self, userId: i32, tag: String) -> Vec<String> {
        self.collect(userId, Some(&tag))
    }

    pub fn completeTask(&mut self, userId: i32, taskId: i32) {
        if taskId <= 0 || taskId as usize > self.tasks.len() {
            return;
        }
        let task = &mut self.tasks[(taskId - 1) as usize];
        if task.user == userId && !task.done {
            task.done = true;
        }
    }

    // No needle means "ignore tags"; otherwise require exact membership.
    fn collect(&self, userId: i32, needle: Option<&String>) -> Vec<String> {
        let mut pending: Vec<(i32, &str)> = self
            .tasks
            .iter()
            .filter(|task| {
                task.user == userId
                    && !task.done
                    && match needle {
                        None => true,
                        Some(needle) => task.tags.iter().any(|t| t == needle),
                    }
            })
            .map(|task| (task.due, task.description.as_str()))
            .collect();
        pending.sort_by_key(|&(due, _)| due);
        pending
            .into_iter()
            .map(|(_, description)| description.to_string())
            .collect()
    }
}
