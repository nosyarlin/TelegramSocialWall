import { faker } from "@faker-js/faker";
import { Message } from "./components/MessageList/MessageCard";
import _ from "lodash";

function createFakeMessage(): Message {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    text: faker.lorem.lines({ min: 1, max: 5 }),
    photoSrc: _.random(0, 1, true) > 0.8 ? faker.image.url() : undefined,
  };
}

export function createFakeMessages(count: number): Message[] {
  return Array(count)
    .fill(undefined)
    .map(() => createFakeMessage());
}
