import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'john_doe' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: '$2b$10$Yp1Yv4WfD5ylQ4lD2G7bOuS9v75O9PfTfJGVju4Qy2Yvh8K4yZgT6' })
  password: string;
}
