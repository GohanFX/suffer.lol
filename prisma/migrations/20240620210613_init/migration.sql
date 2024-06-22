-- CreateTable
CREATE TABLE `Summoner` (
    `accountId` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `profileIconId` INTEGER NOT NULL,
    `puuid` VARCHAR(191) NOT NULL,
    `revisionDate` INTEGER NOT NULL,
    `summonerLevel` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `League` (
    `id` VARCHAR(191) NOT NULL,
    `queueType` VARCHAR(191) NOT NULL,
    `tier` VARCHAR(191) NOT NULL,
    `rank` VARCHAR(191) NOT NULL,
    `summonerId` VARCHAR(191) NOT NULL,
    `leagueId` VARCHAR(191) NOT NULL,
    `wins` INTEGER NOT NULL,
    `losses` INTEGER NOT NULL,
    `leaguePoints` INTEGER NOT NULL,
    `hotStreak` BOOLEAN NOT NULL,
    `veteran` BOOLEAN NOT NULL,
    `freshBlood` BOOLEAN NOT NULL,
    `inactive` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `League` ADD CONSTRAINT `League_summonerId_fkey` FOREIGN KEY (`summonerId`) REFERENCES `Summoner`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
