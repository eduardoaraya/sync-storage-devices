# Storage Sync for All Devices

## Proposal

I want to organise my files from categories in different devices and synchronise them in a cloud storage provider.
It’s also will work as a Backup.
The Ideal is to have a folder structure that will be a pattern for all devices.
Important to deal with large files like photos and videos.
The script should be running into different operational systems like: Mac, Windows and Linux.

## Plus

Integrations with: google driver and gmail.

> The Ideal is also take important attachments from received emails.

## Setup

This should run from a configuration which will tell where should be the directories and the schedule time for execution.
Another important point is that should run in a local backup.

- documents // business, personal
- health
- financial
- photos
- videos
- projects
- portfolio
- academic
- sheets

Configuration file should be like:

```json
{
  schedule: 10000,
  defaultOutput: path.resolve(os.homedir(), "sync_directories"),
  directories: {
    documents: {
      source: [path.resolve(os.homedir(), "Documents")],
    },
    photos: {
      source: [path.resolve(os.homedir(), "Pictures")],
    },
    projects: {
      source: [path.resolve(os.homedir(), "Projects")],
    },
  },
};
```
