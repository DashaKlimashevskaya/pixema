type FilmType = {
      kinopoiskId: number,
      nameRu: string,
      nameEn: string,
      nameOriginal: string,
      countries: [
        {
          country: string
        }
      ],
      genres: [
        {
          genre: string
        }
      ],
      ratingKinopoisk: number,
      ratingImbd: number,
      year: string,
      type: string,
      posterUrl: string,
      posterUrlPreview: string,
      coverUrl: string,
      description: string,
      ratingAgeLimits: string
    }

export type {FilmType}

