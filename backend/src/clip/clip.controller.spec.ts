import { Test, TestingModule } from '@nestjs/testing';
import { ClipController } from './clip.controller';

describe('Clip Controller', () => {
  let controller: ClipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClipController],
    }).compile();

    controller = module.get<ClipController>(ClipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
