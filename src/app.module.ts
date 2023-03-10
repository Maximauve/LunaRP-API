import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { CharacterModule } from './character/character.module';
import { ItemModule } from './item/item.module';
import { Character } from './character/character.entity';
import { Item } from './item/item.entity';
import { SpellModule } from './spell/spell.module';
import { Spell } from './spell/spell.entity';
import { ClassModule } from './class/class.module';
import { Classes } from './class/class.entity';
import { Campaign } from './campaign/campaign.entity';
import { CampaignModule } from './campaign/campaign.module';
import { RaceModule } from './race/race.module';
import { Race } from './race/race.entity';
import { LanguageModule } from './language/language.module';
import { Language } from './language/language.entity';
import { CharacterItem } from './character/character_item.entity';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			useFactory: () => ({
				type: 'mysql',
				host: process.env.DB_HOST,
				port: parseInt(process.env.DB_PORT),
				username: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
				entities: [__dirname + '/**/*.entity{.ts,.js}'],
				synchronize: true,
				autoLoadEntities: true,
			}),
		}),
		UsersModule,
		CharacterModule,
		ItemModule,
		SpellModule,
		ClassModule,
		CampaignModule,
		RaceModule,
		LanguageModule
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
