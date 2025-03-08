import { Scholar } from '../../types/content';

export const ibnUthaymeen: Scholar = {
  id: 'ibn-uthaymeen',
  name: 'Sheikh Ibn Uthaymeen',
  image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80',
  categories: [
    {
      id: 'quran',
      title: 'The Quran',
      icon: 'book',
      series: [
        {
          id: 'tafsir',
          title: 'Tafsir',
          lectures: [
            {
              id: 'fatiha-1',
              title: 'Tafsir Surah Al-Fatiha - Part 1',
              duration: '45:30',
              url: 'https://ia601608.us.archive.org/30/items/1-1_20250224/تفسير%20القرآن%20الكريم%20%7Bسورة%20الفاتحة%7D%20%7B1%7D%20%7B%7B1%7D%7D%20سماحة%20الشيخ%20ال.mp3',
              description: 'Explanation of Surah Al-Fatiha, covering the importance and virtues of the surah.',
            },
            {
              id: 'fatiha-2',
              title: 'Tafsir Surah Al-Fatiha - Part 2',
              duration: '01:33:08',
              url: 'https://ia601608.us.archive.org/30/items/1-1_20250224/تفسير%20القرآن%20الكريم%20%7Bسورة%20الفاتحة%7D%20%7B2%7D%20%7B%7B2%7D%7D%20سماحة%20الشيخ%20ال.mp3',
              description: 'Detailed explanation of the meanings and lessons from Surah Al-Fatiha.',
            },
          ],
        },
        {
          id: 'quranic-sciences',
          title: 'Quranic Sciences',
          lectures: [
            {
              id: 'ulum-1',
              title: 'Introduction to Uloom Al-Quran',
              duration: '38:45',
              url: 'https://example.com/ibn-uthaymeen/ulum-1.mp3',
            },
          ],
        },
        {
          id: 'virtues',
          title: 'Virtues and Etiquette of the Quran',
          lectures: [
            {
              id: 'virtues-1',
              title: 'The Excellence of the Quran',
              duration: '35:20',
              url: 'https://example.com/ibn-uthaymeen/virtues-1.mp3',
            },
          ],
        },
      ],
    },
    {
      id: 'aqeedah',
      title: 'Aqeedah',
      icon: 'heart',
      subCategories: [
        {
          id: 'pillars-of-iman',
          title: 'The 6 Articles of Iman',
          series: [
            {
              id: 'iman-allah',
              title: 'Iman in Allah',
              lectures: [
                {
                  id: 'tawheed-1',
                  title: 'Understanding Tawheed',
                  duration: '41:30',
                  url: 'https://example.com/ibn-uthaymeen/tawheed-1.mp3',
                },
              ],
            },
            {
              id: 'iman-angels',
              title: 'Iman in the Angels',
              lectures: [
                {
                  id: 'angels-1',
                  title: 'The World of Angels',
                  duration: '39:15',
                  url: 'https://example.com/ibn-uthaymeen/angels-1.mp3',
                },
              ],
            },
            {
              id: 'iman-books',
              title: 'Iman in the Books',
              lectures: [
                {
                  id: 'books-1',
                  title: 'Divine Books and Their Importance',
                  duration: '37:20',
                  url: 'https://example.com/ibn-uthaymeen/books-1.mp3',
                },
              ],
            },
            {
              id: 'iman-qadr',
              title: 'Iman in the Qadr',
              lectures: [
                {
                  id: 'qadr-1',
                  title: 'Understanding Divine Decree',
                  duration: '40:15',
                  url: 'https://example.com/ibn-uthaymeen/qadr-1.mp3',
                },
              ],
            },
            {
              id: 'iman-last-day',
              title: 'Iman in the Last Day and Signs of the Hour',
              lectures: [
                {
                  id: 'last-day-1',
                  title: 'Major Signs of the Day of Judgment',
                  duration: '43:25',
                  url: 'https://example.com/ibn-uthaymeen/last-day-1.mp3',
                },
              ],
            },
          ],
        },
        {
          id: 'fundamentals',
          title: 'Fundamentals of Aqeedah',
          series: [
            {
              id: 'nullifiers',
              title: 'Nullifiers of Islam',
              lectures: [
                {
                  id: 'nullifiers-1',
                  title: 'Introduction to the Nullifiers',
                  duration: '44:20',
                  url: 'https://example.com/ibn-uthaymeen/nullifiers-1.mp3',
                },
              ],
            },
            {
              id: 'shirk',
              title: 'Shirk and its Types',
              lectures: [
                {
                  id: 'shirk-1',
                  title: 'Categories of Shirk',
                  duration: '38:45',
                  url: 'https://example.com/ibn-uthaymeen/shirk-1.mp3',
                },
              ],
            },
            {
              id: 'magic',
              title: 'Magic and Sorcery',
              lectures: [
                {
                  id: 'magic-1',
                  title: 'Rulings on Magic and its Types',
                  duration: '42:10',
                  url: 'https://example.com/ibn-uthaymeen/magic-1.mp3',
                },
              ],
            },
            {
              id: 'innovations',
              title: 'Innovations and Novelties',
              lectures: [
                {
                  id: 'bidah-1',
                  title: 'Understanding Religious Innovation',
                  duration: '40:30',
                  url: 'https://example.com/ibn-uthaymeen/bidah-1.mp3',
                },
              ],
            },
            {
              id: 'madhabs',
              title: 'Difference between the Madhabs',
              lectures: [
                {
                  id: 'madhabs-1',
                  title: 'Understanding the Four Schools',
                  duration: '45:15',
                  url: 'https://example.com/ibn-uthaymeen/madhabs-1.mp3',
                },
              ],
            },
            {
              id: 'walaa-baraa',
              title: "Al Wala'a wa Al Bara'a",
              lectures: [
                {
                  id: 'walaa-1',
                  title: 'Principles of Loyalty and Disavowal',
                  duration: '41:40',
                  url: 'https://example.com/ibn-uthaymeen/walaa-1.mp3',
                },
              ],
            },
            {
              id: 'names-attributes',
              title: 'The Names and Attributes of Allah',
              lectures: [
                {
                  id: 'names-1',
                  title: "Understanding Allah's Names",
                  duration: '43:55',
                  url: 'https://example.com/ibn-uthaymeen/names-1.mp3',
                },
              ],
            },
            {
              id: 'misc-faith',
              title: 'Miscellaneous Issues in Faith',
              lectures: [
                {
                  id: 'misc-1',
                  title: 'Contemporary Faith Matters',
                  duration: '39:25',
                  url: 'https://example.com/ibn-uthaymeen/misc-1.mp3',
                },
              ],
            },
            {
              id: 'images',
              title: 'Images and their Rules',
              lectures: [
                {
                  id: 'images-1',
                  title: 'Islamic Rulings on Images',
                  duration: '37:30',
                  url: 'https://example.com/ibn-uthaymeen/images-1.mp3',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'hadith',
      title: 'Hadith',
      icon: 'document-text',
      series: [
        {
          id: 'terminology',
          title: 'The Terminology of the Hadith',
          lectures: [
            {
              id: 'mustalah-1',
              title: 'Introduction to Hadith Terminology',
              duration: '37:45',
              url: 'https://example.com/ibn-uthaymeen/mustalah-1.mp3',
            },
          ],
        },
        {
          id: 'grades',
          title: 'The Grades of the Hadith',
          lectures: [
            {
              id: 'grades-1',
              title: 'Understanding Hadith Classifications',
              duration: '40:20',
              url: 'https://example.com/ibn-uthaymeen/grades-1.mp3',
            },
          ],
        },
        {
          id: 'explanations',
          title: 'Explanations of the Hadith',
          lectures: [
            {
              id: 'explanations-1',
              title: 'Methodology of Understanding Hadith',
              duration: '42:15',
              url: 'https://example.com/ibn-uthaymeen/explanations-1.mp3',
            },
          ],
        },
      ],
    },
    {
      id: 'seerah',
      title: 'Seerah and History',
      icon: 'time',
      series: [
        {
          id: 'events',
          title: 'Events of the Seerah',
          lectures: [
            {
              id: 'seerah-1',
              title: 'The Birth of the Prophet ﷺ',
              duration: '43:15',
              url: 'https://example.com/ibn-uthaymeen/seerah-1.mp3',
            },
          ],
        },
        {
          id: 'characteristics',
          title: 'The Characteristics of the Prophet ﷺ and His Rights',
          lectures: [
            {
              id: 'characteristics-1',
              title: 'Noble Characteristics of the Prophet ﷺ',
              duration: '41:30',
              url: 'https://example.com/ibn-uthaymeen/characteristics-1.mp3',
            },
          ],
        },
        {
          id: 'historical-events',
          title: 'Historical Events and Issues',
          lectures: [
            {
              id: 'history-1',
              title: 'Important Historical Events in Islam',
              duration: '39:45',
              url: 'https://example.com/ibn-uthaymeen/history-1.mp3',
            },
          ],
        },
      ],
    },
  ],
};