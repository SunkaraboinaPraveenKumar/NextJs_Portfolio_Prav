import { DataAPIClient } from "@datastax/astra-db-ts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import "dotenv/config";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import ExperienceData from "../data/experience.json" with { type: "json" };
import ProjectsData from "../data/projects.json" with { type: "json" };
import SkillsData from "../data/skills.json" with { type: "json" };

const hf_embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGING_FACE_API_KEY,
});

const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN);

const db = client.db(process.env.ASTRA_DB_API_ENDPOINT, {
  namespace: process.env.ASTRA_DB_NAMESPACE, // Make sure this is set correctly
});

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

// Use a collection name without a hyphen to avoid potential issues.
const collectionName = "my_portfolio";

const createCollection = async () => {
  try {
    await db.createCollection(collectionName, {
      vector: {
        dimension: 768,
      },
    });
  } catch (e) {
    console.log("Collection Already Exists!!");
  }
};

function transformExperience(exp) {
  const experiencesJoined = (exp?.experiences || []).join("\n");
  const text =
    `Role: ${exp?.role}\n` +
    `Organisation: ${exp?.organisation}\n` +
    `Duration: ${exp?.startDate} - ${exp?.endDate}\n` +
    `Location: ${exp?.location}\n` +
    `Experiences:\n${experiencesJoined}`;
  return text;
}

function transformProject(proj) {
  const text =
    `Title: ${proj.title}\n` +
    `Description: ${proj.description}\n` +
    `Demo: ${proj.demo}\n` +
    `Source: ${proj.source}\n` +
    `Deploy: ${proj.deploy}`;
  return text;
}

function transformSkill(skill) {
  return `Skill: ${skill.title}`;
}

const loadData = async () => {
  const collection = await db.collection(collectionName);
  for await (const experience of ExperienceData) {
    const chunks = await splitter.splitText(transformExperience(experience));
    for (const chunk of chunks) {
      const embeddings = await hf_embeddings.embedDocuments([chunk]);
      await collection.insertOne({
        document_id: experience?.id,
        $vector: embeddings[0],
        description:experience
      });
    }
  }

  console.log("Experience data added");
};

const loadData1 = async () => {
    const collection = await db.collection(collectionName);
    for await (const skill of SkillsData) {
      const chunks = await splitter.splitText(transformSkill(skill));
      for (const chunk of chunks) {
        const embeddings = await hf_embeddings.embedDocuments([chunk]);
        await collection.insertOne({
          document_id: skill?.id,
          $vector: embeddings[0],
          description:skill
        });
      }
    }
  
    console.log("Skills data added");
  };

  const loadData2 = async () => {
    const collection = await db.collection(collectionName);
    for await (const project of ProjectsData) {
      const chunks = await splitter.splitText(transformProject(project));
      for (const chunk of chunks) {
        const embeddings = await hf_embeddings.embedDocuments([chunk]);
        await collection.insertOne({
          document_id: project?.id,
          $vector: embeddings[0],
          description:project
        });
      }
    }
  
    console.log("Project data added");
  };

createCollection().then(() => loadData());
createCollection().then(() => loadData1());
createCollection().then(() => loadData2());
