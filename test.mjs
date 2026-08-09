import puter from '@heyputer/puter.js';
async function test() {
  try {
    const res = await puter.ai.chat('say hello');
    console.log(res);
  } catch(e) {
    console.error(e);
  }
}
test();
