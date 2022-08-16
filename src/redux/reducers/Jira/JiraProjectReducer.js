import { EDIT_PROJECT, GET_PROJECT_DETAIL } from "../../types/JiraConstants";

const initialState = {
  projectUpdate: {
    id: 0,
    projectName: "string",
    creator: 0,
    description: "string",
    categoryId: "2",
  },
  projectDetail: {
    lstTask: [
      {
        lstTaskDeTail: [
          {
            priorityTask: {
              priorityId: 3,
              priority: "Low",
            },
            taskTypeDetail: {
              id: 1,
              taskType: "bug",
            },
            assigness: [
              {
                id: 2361,
                avatar: "https://ui-avatars.com/api/?name=pham Hoang",
                name: "pham Hoang",
                alias: "pham-hoang",
              },
              {
                id: 2241,
                avatar: "https://ui-avatars.com/api/?name=Phạm Khắc Hiền",
                name: "Phạm Khắc Hiền",
                alias: "pham-khac-hien",
              },
            ],
            lstComment: [],
            taskId: 5286,
            taskName: "di choi 4 ",
            alias: "di-choi-4",
            description: "<p>nhanh</p>",
            statusId: "1",
            originalEstimate: 8,
            timeTrackingSpent: 4,
            timeTrackingRemaining: 3,
            typeId: 0,
            priorityId: 0,
            projectId: 6900,
          },
        ],
        statusId: "1",
        statusName: "BACKLOG",
        alias: "tồn đọng",
      },
      {
        lstTaskDeTail: [
          {
            priorityTask: {
              priorityId: 2,
              priority: "Medium",
            },
            taskTypeDetail: {
              id: 2,
              taskType: "new task",
            },
            assigness: [
              {
                id: 862,
                avatar: "https://ui-avatars.com/api/?name=Testing123123",
                name: "Testing123123",
                alias: "crystal",
              },
            ],
            lstComment: [],
            taskId: 5278,
            taskName: "di choi 3",
            alias: "di-choi-3",
            description: "<p>nhanh</p>",
            statusId: "2",
            originalEstimate: 5,
            timeTrackingSpent: 4,
            timeTrackingRemaining: 2,
            typeId: 0,
            priorityId: 0,
            projectId: 6900,
          },
          {
            priorityTask: {
              priorityId: 2,
              priority: "Medium",
            },
            taskTypeDetail: {
              id: 2,
              taskType: "new task",
            },
            assigness: [
              {
                id: 2092,
                avatar: "https://ui-avatars.com/api/?name=chien khu",
                name: "chien khu",
                alias: "chien-khu",
              },
              {
                id: 2241,
                avatar: "https://ui-avatars.com/api/?name=Phạm Khắc Hiền",
                name: "Phạm Khắc Hiền",
                alias: "pham-khac-hien",
              },
              {
                id: 2237,
                avatar: "https://ui-avatars.com/api/?name=vi",
                name: "vi",
                alias: "vi",
              },
            ],
            lstComment: [],
            taskId: 5299,
            taskName: "lau nha ",
            alias: "lau-nha",
            description: "<p>ual ohn</p>",
            statusId: "2",
            originalEstimate: 5,
            timeTrackingSpent: 7,
            timeTrackingRemaining: 6,
            typeId: 0,
            priorityId: 0,
            projectId: 6900,
          },
        ],
        statusId: "2",
        statusName: "SELECTED FOR DEVELOPMENT",
        alias: "được chọn để phát triển",
      },
      {
        lstTaskDeTail: [
          {
            priorityTask: {
              priorityId: 1,
              priority: "High",
            },
            taskTypeDetail: {
              id: 1,
              taskType: "bug",
            },
            assigness: [
              {
                id: 2241,
                avatar: "https://ui-avatars.com/api/?name=Phạm Khắc Hiền",
                name: "Phạm Khắc Hiền",
                alias: "pham-khac-hien",
              },
              {
                id: 2092,
                avatar: "https://ui-avatars.com/api/?name=chien khu",
                name: "chien khu",
                alias: "chien-khu",
              },
            ],
            lstComment: [],
            taskId: 5282,
            taskName: "tv",
            alias: "tv",
            description: "<p>asdsadsada</p>",
            statusId: "3",
            originalEstimate: 1,
            timeTrackingSpent: 1,
            timeTrackingRemaining: 0,
            typeId: 0,
            priorityId: 0,
            projectId: 6900,
          },
        ],
        statusId: "3",
        statusName: "IN PROGRESS",
        alias: "trong tiến trình",
      },
      {
        lstTaskDeTail: [
          {
            priorityTask: {
              priorityId: 2,
              priority: "Medium",
            },
            taskTypeDetail: {
              id: 2,
              taskType: "new task",
            },
            assigness: [],
            lstComment: [],
            taskId: 5276,
            taskName: "di choi",
            alias: "di-choi",
            description: "<p>aaaaavvvvvvv</p>",
            statusId: "4",
            originalEstimate: 0,
            timeTrackingSpent: 10,
            timeTrackingRemaining: 6,
            typeId: 0,
            priorityId: 0,
            projectId: 6900,
          },
          {
            priorityTask: {
              priorityId: 2,
              priority: "Medium",
            },
            taskTypeDetail: {
              id: 1,
              taskType: "bug",
            },
            assigness: [
              {
                id: 984,
                avatar: "https://ui-avatars.com/api/?name=Change Name123123",
                name: "Change Name123123",
                alias: "dat",
              },
            ],
            lstComment: [],
            taskId: 5277,
            taskName: "di choi 2",
            alias: "di-choi-2",
            description:
              "<p>nhanh len m m m asdjhaljksdhajkldadadsasdasdasd</p>",
            statusId: "4",
            originalEstimate: 5,
            timeTrackingSpent: 11,
            timeTrackingRemaining: 10,
            typeId: 0,
            priorityId: 0,
            projectId: 6900,
          },
        ],
        statusId: "4",
        statusName: "DONE",
        alias: "hoàn thành",
      },
    ],
    members: [
      {
        userId: 2092,
        name: "chien khu",
        avatar: "https://ui-avatars.com/api/?name=chien khu",
        email: null,
        phoneNumber: null,
      },
      {
        userId: 2241,
        name: "Phạm Khắc Hiền",
        avatar: "https://ui-avatars.com/api/?name=Phạm Khắc Hiền",
        email: null,
        phoneNumber: null,
      },
      {
        userId: 2361,
        name: "pham Hoang",
        avatar: "https://ui-avatars.com/api/?name=pham Hoang",
        email: null,
        phoneNumber: null,
      },
      {
        userId: 2237,
        name: "vi",
        avatar: "https://ui-avatars.com/api/?name=vi",
        email: null,
        phoneNumber: null,
      },
    ],
    creator: {
      id: 2365,
      name: "Hoang Tai",
    },
    id: 6900,
    projectName: "project 2",
    description: "<p>nghiep vu 1</p>",
    projectCategory: {
      id: 2,
      name: "Dự án phần mềm",
    },
    alias: "project-2",
  },
};
const JiraProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROJECT:
      return { ...state, projectUpdate: action.models };
    case GET_PROJECT_DETAIL:
      return { ...state, projectDetail: action.projectDetail };
    default:
      return state;
  }
};

export default JiraProjectReducer;
