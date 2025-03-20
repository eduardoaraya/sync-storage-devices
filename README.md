# Storage Sync for All Devices

I want to organise my files from categories in different devices and synchronise them in a cloud storage provider.
It’s also will work as a Backup process.

The Ideal is to have a folder structure that will be a pattern for all devices.
Important to deal with large files like photos and videos.

The script should be running into different operational systems like: Mac, Windows and Linux.

The first programming language there I’m looking for is Nodejs (typescript).

It’s important to have an integration with google driver and gmail.
The Ideal is also take important attachments from received emails.

This should run from a configuration which will tell where should be the directories and the schedule time for execution.

Another important point is that should run in a local backup.

I was thinking about this structure directory:

- documents // business, personal
- health
- financial
- photos
- videos
- projects
- portfolio
- academic
- sheets

And the configuration file:

```ts
{
	schedule: number;
	dirs: string[],
	zipPattern: string[],
	backupAddress: string;
}


```
