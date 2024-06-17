import { faker } from "@faker-js/faker";
import { Message } from "./MessageCard";
import random from "lodash.random";

function createFakeMessage(): Message {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    text: faker.lorem.lines({ min: 1, max: 5 }),
    photoSrc: random(0, 1, true) > 0.8 ? faker.image.url() : undefined,
  };
}

export function createFakeMessages(count: number): Message[] {
  return Array(count)
    .fill(undefined)
    .map(() => createFakeMessage());
}
