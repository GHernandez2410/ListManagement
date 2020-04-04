import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRespository } from './task.respositiry';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    constructor( 
        @InjectRepository(TaskRespository)
        private taskRespository: TaskRespository,
    ) {}

    async createTask(createTaskDto: CreateTaskDto){
        return await this.taskRespository.createTask(createTaskDto);
    }

    async getTasks(){
       return await this.taskRespository.getTasks();
    }

    async updateTask(id: string, done: string){
        const transformedId: number = parseInt(id);
        return await this.taskRespository.updateTask(transformedId,
            done ? 'true' : 'false');
    }

    async deleteTask(id: string){
        const transformedId: number = parseInt(id);
        return await this.taskRespository.deleteTask(transformedId);
    }
}