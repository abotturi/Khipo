import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  statusServer(){
    return {message: 'Server ok'};
  }
}
