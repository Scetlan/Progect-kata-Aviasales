const fakeExecuteSort = async (payload, modifiedTickets) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (payload === "cheap") {
        const result = [...modifiedTickets].sort((a, b) => a.price - b.price);

        resolve(result);
      }

      if (payload === "fast") {
        const result = [...modifiedTickets].sort((current, next) => {
          //Получаем сумму duration в обоих направлениях для current и next билетов.
          const durationCurrent = current.segments[0].duration + current.segments[1].duration;
          const durationNext = next.segments[0].duration + next.segments[1].duration;

          return durationCurrent - durationNext;
        });

        resolve(result);
      }

      if (payload === "optimal") {
        const result = [...modifiedTickets].sort((current, next) => {
          const priceDiff = current.price - next.price;
          const durationAdurationCurrent = current.segments[0].duration + current.segments[1].duration;
          const durationBdurationNext = next.segments[0].duration + next.segments[1].duration;

          const durationDiff = durationAdurationCurrent - durationBdurationNext;

          // Смотрим разницу
          if (priceDiff >= 0) {
            return durationDiff;
          }
          return priceDiff;
        });

        resolve(result);
      }
    }, 0);
  });
}

export default fakeExecuteSort;