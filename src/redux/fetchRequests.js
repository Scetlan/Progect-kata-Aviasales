class Api {
  constructor() {
    this.api = "https://aviasales-test-api.kata.academy";
  }

  async fetchAviasales(url, fetchOptions) {
    try {
      const response = await fetch(`${this.api}${url}`, fetchOptions);
      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      throw new Error("Network error");
    }
  }
  async get(url, fetchOptions = null) {
    const optionsWithMethod = { ...fetchOptions, method: 'GET' };
    return this.fetchAviasales(url, optionsWithMethod);
  }

  async post(url, fetchOptions = null) {
    const optionsWithMethod = { ...fetchOptions, method: 'POST' };
    return this.fetchAviasales(url, optionsWithMethod);
  }

  async createSession(fetchOptions = null) {
    const optionsWithMethod = { ...fetchOptions, method: 'GET' };
    return this.fetchAviasales("/search", optionsWithMethod);
  }

  async fakeEndpoint(delay, state) {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        resolve(state);
        rejected(new Error("Rejected fakeEndpoint"));
      }, delay);
    });
  }

  async fakeExecuteSort(payload, modifiedTickets) {
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
}

export { Api };