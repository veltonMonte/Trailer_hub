import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {

  getHello(): string {
    return "Trailer Hub API is running 🚀";
  }

}
