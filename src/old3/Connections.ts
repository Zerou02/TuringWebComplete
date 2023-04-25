import type { Pin } from "./Pin";

export class Connection {
  other: Pin;
  inner: boolean;
  constructor(other: Pin, inner: boolean) {
    this.other = other;
    this.inner = inner;
  }
}
