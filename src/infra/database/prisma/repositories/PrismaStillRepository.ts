import { Injectable } from '@nestjs/common';
import { Still } from 'src/modules/still/entities/Still';
import { StillRepository } from 'src/modules/still/repositories/StillRepository';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { PrismaStillMapper } from '../mappers/PrismaStillMapper';

@Injectable()
export class PrismaStillRepository implements StillRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(still: Still): Promise<void> {
    const prismaStill = PrismaStillMapper.toPrisma(still);
    await this.prisma.still.create({
      data: prismaStill,
    });
  }

  async createMany(stills: Still[]): Promise<void> {
    const prismaStills = stills.map((still) =>
      PrismaStillMapper.toPrisma(still),
    );
    await this.prisma.still.createMany({
      data: prismaStills,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.still.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<Still | null> {
    const still = await this.prisma.still.findUnique({
      where: { id },
      include: { movie: true },
    });

    if (!still) {
      return null;
    }

    return PrismaStillMapper.toDomain(still);
  }
}
