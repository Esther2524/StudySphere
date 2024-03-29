# StudySphere: Focus & Friends
NEU CS5520 Spring 2024
Group Members: Haoning Wang, Zhixiao Wang

## App Description
*Elevate Your Learning with StudySphere: Focus & Friends – Where Focus Meets Friendship!* 😉

In today's fast-paced world, finding the right balance between **productivity** and **social interaction** can be challenging. StudySphere: Focus & Friends is here to revolutionize the way you study, track, and share your academic journey! This innovative app combines the proven effectiveness of focused study sessions with the motivational power of social connectivity, making it the perfect tool for anyone looking to enhance their learning!

StudySphere: Focus & Friends is mainly designed for students aged above 14 who are seeking to improve their study habits and eager to use technology for a more organized, efficient, and interactive study experience.


## Current State
### Iteration 1 (March 28, 2024)
1. Functionality Implementation
  * **Focus Tasks**: 
     * **Addition**: Users can add a new personalized focus task. All focus tasks are displayed on the main screen for easy access.
     * **Modification**: By tapping the left part of each focus task card, users can edit or delete the task as needed.
     * **Start a Focus Session**: The "Start" button on the right initiates a distraction-free study session (Pomodoro) with a countdown timer.
     * **Session Completion**: Users can choose to leave the session before the countdown ends or let it finish automatically.
     * **Reminders**: Users can create or delete a reminder. (Note: Currently, notifications for reminders are not supported)
     * **Completion Tracking**: Each focus task displays the number of times it has been completed without interruption.
  * **Groups**:
     * **Study Group Creation**: Users can create a new study group.
     * **Study Group Discovery**: Users can search for and join study groups. 
     * **Membership**: Users can leave a previously joined study group.
     * **Study Time Display**: Display the user's study time for the day alongside the study times of other group members.
     * **Member Interaction**: Users can acknowledge other members' achievements with a "like" feature.
  * **Dashboard**:
    * **Daily Overview**: Provide a summary of the user’s daily study activities, including total study hours, the number of breaks taken, and the number of sessions completed without interruptions.
    * **Focus Task Time Distribution**: Display the proportion of study time dedicated to each focus task on a pie chart.
    * **Weekly Study Time Distribution**: Display the distribution of the user's study time over the week on a bar chart.
  * **Profile**: 
    * **Personal Information Display**: Users can view their name, email, and avatar. (Note: Avatar switching is currently not available)
    * **Username Modification**: Users can  edit their username for personalization.


2. Navigation Implementation and CRUD operations to Firestore
   * Auth Stack Navigator
     * This navigator is the entry point for unauthenticated users, directing them to either log in or sign up. It incorporates two screens, LoginScreen and SignupScreen, ensuring users can securely access their accounts or create new ones. The Auth Stack Navigator is conditionally rendered based on the authentication state managed through Firebase Authentication. If a user is not authenticated, this navigator is displayed, guiding the user through the authentication process.
   * App Tab Navigator
     * Upon successful authentication, the App Tab Navigator becomes the heart of the application's user interface. It organizes the app's main features into five tabs: Focus List, Study Group, Find Group, Dashboard, and Profile. This navigator enhances the user experience by providing a bottom tab bar for easy navigation between the app's primary features.
   * Focus Stack Navigator
     *  Nested within the App Tab Navigator, the Focus Stack Navigator handles the navigation related to focus tasks. It starts with the FocusScreen, where users can manage their focus tasks. The StandbyScreen is accessible from here, presented modally, to offer users a distraction-free environment for focused study sessions.
   * Group Stack Navigator
     * Nested within the App Tab Navigator, the Group Stack Navigator manages study groups. It begins with the StudyGroupScreen, allowing users to explore and manage their study groups. The GroupDetailsScreen provides detailed information about a specific study group. This navigator illustrates the application's group management features, including joining, creating, and interacting with study groups.
   * Firestore CRUD Operations

3. Data Model (Collections)
  * **Users Collection**
    * userEmail: String (user's email)
    * userName: String (user's name)
    * status(Optional): String (can be used to indicate user's current status, e.g., "online", "offline", or null if not applicable)
    * avatar(Optional): String (URL to the user's avatar image)
    * reminder(Optional): An array of objects or strings indicating reminder times and their repeat patterns
    * groups(Optional): An array of objects where each object represents a group the user has interacted with (either by joining or requesting to join).
  * **Focus Collection** (A Sub-collection of User collection)
    * title: String (Focus title, e.g., "Study Python")
    * duration: Integer (Expected duration to complete the task, in minutes)
    * location(Optional): An array of objects
    * lastUpdate: Timestamp(when the focus was completed last time)
    * todayBreaks: Integer (Number of breaks today)
    * todayTimes: Integer (Number of completion times today)
    * weeklyStudyTime: An array of length 7
    * monthlyStudyTime: An array of length 7
  * **Progress Collection** (A Sub-collection of User collection)
    * date: Timestamp (the specific day of the progress entry)
    * focusTasksCompleted: Integer (number of focus tasks completed)
    * studyHours: Float (total hours spent studying)
    * breaks: Integer (number of breaks)
  * **Groups Collection**
    * groupName: String (name of the study group)
    * groupMembers: Array of Objects (each object contains user details and join status)
    * groupOwnerId: String (Document ID of the group owner, referencing a User document)

4. CRUD Operations on Collections
  For the current of our app, we do

## Member Contribution
* Haoning:
* Zhixiao: 

## User Guide
