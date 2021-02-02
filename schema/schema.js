const graphql = require('graphql');
const _ =require('lodash');

const Member = require('../models/member');
const Project = require('../models/project');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const Like = require('../models/like');
const Posts = require('../models/posts');
const AdditionPost = require('../models/additionPost');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean,
    GraphQLInt,
} = graphql;

const MemberType = new GraphQLObjectType({
    name: 'Member',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        degree: { type: GraphQLString },
        skills: { type: new GraphQLList(GraphQLString)},
        hobbies: { type: new GraphQLList(GraphQLString)},
        collaborationsID: { type: new GraphQLList(GraphQLString) },
        collaborations: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                // find collaborated projects
                return Project.find({ collaboratorsID: [parent.id] });
            }
        },
        graduated: { type: GraphQLBoolean },
        admin: { type: GraphQLBoolean },
        dateJoined: { type: GraphQLString },
        dateGraduated: { type: GraphQLString },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                // find project by authorID
                return Project.find({ authorID: parent.id })
            }
        },
        blogs: {
            type: new GraphQLList(BlogType),
            resolve(parent, args){
                // find project by authorID
                return Blog.find({ authorID: parent.id })
            }
        },
    })
});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        authorID: { type: GraphQLID },
        description: { type: GraphQLString },
        repoUrl: { type: GraphQLString },
        demoUrl: { type: GraphQLString },
        tools: { type: new GraphQLList(GraphQLString) },
        dateAdded: { type: GraphQLString },
        collaboratorsID: { type: new GraphQLList(GraphQLString) },
        collaborators: {
            type: new GraphQLList(MemberType),
            resolve(parent, args){
                // find collaborators
                return Member.find({ collaborationsID: [parent.id] });
            }
        },
        author: {
            type: MemberType,
            resolve(parent, args){
                // find member
                return Member.findById(parent.authorID)
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, args){
                //find comments
                return Comment.find({ parentID: parent.id });
            }
        },
        likes: {
            type: new GraphQLList(CommentType),
            resolve(parent, args){
                //find likes
                return Like.find({ parentID: parent.id });
            }
        },
    })
});

const BlogType = new graphql.GraphQLObjectType({
    name: 'Blog',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        authorID: { type: GraphQLID },
        description: { type: GraphQLString },
        url: { type: GraphQLString },
        dateAdded: { type: GraphQLString },
        author: {
            type: MemberType,
            resolve(parent, args){
                // find member
                return Member.findById(parent.authorID)
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, args){
                //find comments
                return Comment.find({ parentID: parent.id });
            }
        },
        likes: {
            type: new GraphQLList(CommentType),
            resolve(parent, args){
                //find likes
                return Like.find({ parentID: parent.id });
            }
        },
    })
});

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        parentID: { type: GraphQLString },
        authorID: { type: GraphQLString },
        dateAdded: { type: GraphQLString },
    })
});

const LikeType = new GraphQLObjectType({
    name: 'Like',
    fields: () => ({
        id: { type: GraphQLID },
        parentID: { type: GraphQLString },
        authorID: { type: GraphQLString },
        dateAdded: { type: GraphQLString },
    })
});

const PostsType = new GraphQLObjectType({
    name: 'Posts',
    fields: () => ({
        id: { type: GraphQLID },
        type: { type: GraphQLString },
        authorID: { type: GraphQLString },
        content: { type: GraphQLString },
        title: { type: GraphQLString },
        dateAdded: { type: GraphQLString },
        author: {
            type: MemberType,
            resolve(parent, args){
                // find member
                return Member.findById(parent.authorID)
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, args){
                //find comments
                return Comment.find({ parentID: parent.id });
            }
        },
        likes: {
            type: new GraphQLList(CommentType),
            resolve(parent, args){
                //find likes
                return Like.find({ parentID: parent.id });
            }
        },
    })
});

const AdditionPostType = new GraphQLObjectType({
    name: 'AdditionPost',
    fields: () => ({
        id: { type: GraphQLID },
        type: { type: GraphQLString },
        authorID: { type: GraphQLString },
        url: { type: GraphQLString },
        dateAdded: { type: GraphQLString },
        author: {
            type: MemberType,
            resolve(parent, args){
                // find member
                return Member.findById(parent.authorID)
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, args){
                //find comments
                return Comment.find({ parentID: parent.id });
            }
        },
        likes: {
            type: new GraphQLList(CommentType),
            resolve(parent, args){
                //find likes
                return Like.find({ parentID: parent.id });
            }
        },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'Root',
    fields: {
        members: {
            type: new GraphQLList(MemberType),
            resolve(parent, args){
                //reatrn all members
                return Member.find({ graduated: false });
            }
        },
        graduatedMembers: {
            type: new GraphQLList(MemberType),
            resolve(parent, args){
                //reatrn all members
                return Member.find({ graduated: true });
            }
        },
        member: {
            type: MemberType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                //return specific member
                return Member.findById(args.id);
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                // return all projects;
                return Project.find({});
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                //return specific project
                return Project.findById(args.id);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addMember:{
            type: MemberType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve(parent, args){
                // add member in db
                let member = new Member({
                    name: args.name,
                    email: args.email,
                });
                return member.save();
            }
        },
        addProject:{
            type: ProjectType,
            args: {
                name: { type: GraphQLString },
                authorID: { type: GraphQLID }
            },
            resolve(parent, args){
                // add project in db
                let project = new Project({
                    name: args.name,
                    authorID: args.authorID
                });
                return project.save();
            }
        },
        addComment: {
            type: CommentType,
            args: {
                content: { type: GraphQLString },
                authorID: { type: GraphQLString },
                parentID: { type: GraphQLString },
            },
            resolve(parent, args){
                //add comment in db
                let comment = new Comment({
                    content: args.content,
                    authorID: args.authorID,
                    parentID: args.parentID,
                });
                return comment.save();
            }
        },
        addLike: {
            type: LikeType,
            args: {
                authorID: { type: GraphQLString },
                parentID: { type: GraphQLString },
            },
            resolve(parent, args){
                //add like in db
                let like = new Comment({
                    authorID: args.authorID,
                    parentID: args.parentID,
                });
                return like.save();
            }
        },
        updateEmail: {
            type: MemberType,
            args: {
                id: { type: GraphQLID },
                email: { type: GraphQLString },
            },
            resolve(parent, args){
                //add like in db
                let like = {
                    email: args.email
                };
                console.log(Member.updateOne({ _id: args.id },
                    like));
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});