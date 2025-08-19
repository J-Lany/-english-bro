const queues = new Map();

/**
 * Middleware для последовательной обработки апдейтов от одного источника
 * (чат или чат+пользователь).
 *
 * @param {(ctx: import("grammy").Context) => string[]} getKeys
 */
export function sequentialize(getKeys) {
  return async (ctx, next) => {
    const keys = getKeys(ctx);
    if (!keys || keys.length === 0) {
      return next();
    }

    // Берём первый ключ (например chat.id или chat.id+user.id)
    const key = keys[0];

    let prev = queues.get(key) || Promise.resolve();

    let resolver;
    const current = new Promise((resolve) => (resolver = resolve));
    queues.set(
      key,
      prev.then(() => current)
    );

    try {
      await prev; // ждём окончания предыдущего
      await next();
    } finally {
      resolver(); // освобождаем очередь
      if (queues.get(key) === current) {
        queues.delete(key);
      }
    }
  };
}
