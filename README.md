# Facebook Data Analyzer
Take a peek to what have been your Facebook Messenger life

> ❗ **Note and Precaution**: The interpretation of your data is purely subjective to you, and thus can be destructive. If you believe you are one of those users, please do not proceed. The owner/developers/maintainers of this project will not be held liable for any damages(please refer to project license for more information). Above all, let us remember to practice self love.

> ❗ **Note and Precaution**: This project is not associated with Facebook or Facebook Messenger.

![Preview](https://raw.githubusercontent.com/ming-suhi/facebook-data-analyzer/c5768cd32c852073808cfd5321b1dc89be90a8dc/assets/preview.png)

# Features
Listed below are the current project features and may change in the future. Make sure to ⭐ star this repo to be updated of new changes.
- Account full name
- Account registered date
- Messages encountered
- Messages sent
- Messages received
- Words sent
- Chart displaying messages sent per year
- Chart displaying messages sent per hour
- Table of channels(direct messages and group chats) you have sent the most messages to
- Table of words you frequently use

# Usage
The steps below will not cover the installation of `Node` and `Git`, which are prerequisites for running this project. If you want to proceed with this project, but don't have `Node` and `Git` installed, please refer to other sources for installation. If you have experience in another language, you can try looking for a similar project using that language.

A. Downloading your data from Facebook
1. Go to Facebook `Settings`
2. From there go to `Your Facebook Information`
3. View `Download Your Information`
4. Select `All time` for `Date Range`
5. Select `JSON` for `Format`
6. Make sure `Messages` is checked for `Your Activity Across Facebook`
7. Press `Create File`
8. Wait for email from Facebook containing download link
9. Download the zip file through the provided link
10. Extract the zip file and take note of the path to the extracted folder

B. Using this project
1. Clone this project by running `git clone https://github.com/ming-suhi/facebook-data-analyzer.git` 
2. Go to project directory
3. Create a `.env` file and store the extracted folder path(please refer to `example.env` for example)
4. Install dependencies by running `npm i` in the project directory
5. Finally, run this project with `npm run start`, and you can view it in a browser by going typing `localhost:8000` in the url field.

# Contributing
## A. Issues
This project uses GitHub Issues to track bugs and feature requests. Please search the existing issues before filing new issues to avoid duplicates. For new issues, file your bug or feature request as a new issue.

For help and questions about using this project, please open a GitHub issue.

## B. Pull requests

1. Fork the project.

2. Create a topic branch from master.

3. Make some commits to improve the project.

4. Push this branch to your GitHub project.

5. Open a Pull Request on GitHub.

6. Discuss, and optionally continue committing.

# License
MIT © 明suhi