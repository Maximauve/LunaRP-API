
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import LocalFile from './localFile.entity';
 
@Injectable()
class LocalFilesService {
  constructor(
    @InjectRepository(LocalFile)
    private localFilesRepository: Repository<LocalFile>,
  ) {}
 
  async saveLocalFileData(fileData: LocalFileDto) {
    const newFile = await this.localFilesRepository.create(fileData)
    await this.localFilesRepository.save(newFile);
    return newFile;
  }

  async getFileById(fileId: number) {
    const file = await this.localFilesRepository.findOne({where : {id: fileId}});
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }

  async deleteFileById(fileId: number) {
    const file = await this.getFileById(fileId);
    return await this.localFilesRepository.remove([file]);
  }
}
 
export default LocalFilesService;