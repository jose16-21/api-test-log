import { ExternalService } from "../services/ExternalService";

export class ExternalUseCases {
  constructor(private externalService: ExternalService) {}

  async fetchPost(id: number): Promise<any> {
    return this.externalService.getPost(id);
  }
}