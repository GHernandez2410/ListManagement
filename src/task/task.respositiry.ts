import {EntityRepository, Repository} from 'typeorm';
import {Task} from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRespository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto) {
        const task  = new Task();

        task.title = createTaskDto.title;
        task.description = createTaskDto.description;
        task.done = 'false';

        try {
            await task.save();//funtion provided from the base entity of the respository
            return task;
        } catch(e) {
            console.error(e);
            throw new InternalServerErrorException();
        }
    }

    async getTasks() {
        try {
            const tasks = await Task.find();
            return tasks;
        } catch(e) {
            console.error(e);
            throw new InternalServerErrorException();
        }
    }

    async updateTask(id: number, done: string) {
        const task = await Task.findOne({
            where : {id}
        });
        
        task.done = done;

        try {
            await task.save();//funtion provided from the base entity of the respository
            return task;
        } catch(e) {
            console.error(e);
            throw new InternalServerErrorException();
        }
    }

    async deleteTask(id: number) {
       
        try{
           await Task.delete({id})
        } catch(e) {
            console.error(e);
            throw new InternalServerErrorException();
        }
    }
} 