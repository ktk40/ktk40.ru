<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'top',
            'position' => 0,
            'url' => '/sveden',
            'status' => 'discharge',
            'en' => ['title' => 'Information about the educational organization'],
            'ru' => ['title' => 'Сведения об образовательной организации'],
        ];
        $sveden = Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 0,
            'url' => '/sveden/history',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'History'],
            'ru' => ['title' => 'История'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 1,
            'url' => '/sveden/common',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Basic information'],
            'ru' => ['title' => 'Основные сведения'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 2,
            'url' => '/sveden/struct',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'The structure and management bodies of an educational organization'],
            'ru' => ['title' => 'Структура и органы управления образовательной организацией'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 3,
            'url' => '/sveden/document',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Documents'],
            'ru' => ['title' => 'Документы'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 4,
            'url' => '/sveden/education',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Education'],
            'ru' => ['title' => 'Образование'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 5,
            'url' => '/sveden/eduStandarts',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Educational standards and requirements'],
            'ru' => ['title' => 'Образовательные стандарты и требования'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 6,
            'url' => '/sveden/guide',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Guide'],
            'ru' => ['title' => 'Руководство'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 7,
            'url' => '/sveden/employees',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Teaching staff'],
            'ru' => ['title' => 'Педагогический состав'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 8,
            'url' => '/sveden/objects',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Material and technical support and equipment of the educational process'],
            'ru' => ['title' => 'Материально-техническое обеспечение и оснащенность образовательного процесса'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 9,
            'url' => '/sveden/grants',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Scholarships and types of financial support'],
            'ru' => ['title' => 'Стипендии и виды материальной поддержки'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 10,
            'url' => '/sveden/paid_edu',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Paid educational services'],
            'ru' => ['title' => 'Платные образовательные услуги'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 11,
            'url' => '/sveden/budget',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Financial and economic activities'],
            'ru' => ['title' => 'Финансово-хозяйственная деятельность'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 12,
            'url' => '/sveden/vacant',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Vacant places for admission (transfer) of students'],
            'ru' => ['title' => 'Вакантные места для приема (перевода) обучающихся'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 13,
            'url' => '/sveden/inter',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'International cooperation'],
            'ru' => ['title' => 'Международное сотрудничество'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 14,
            'url' => '/sveden/ovz',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Available environment'],
            'ru' => ['title' => 'Доступная среда'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 15,
            'url' => '/sveden/nutrition',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Catering in an educational organization'],
            'ru' => ['title' => 'Организация питания в образовательной организации'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 16,
            'url' => '/sveden/law-map',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Legislative map'],
            'ru' => ['title' => 'Законодательная карта'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 17,
            'url' => '/abitur',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Applicant'],
            'ru' => ['title' => 'Абитуриентам'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'top',
            'position' => 1,
            'url' => '/abitur',
            'status' => 'discharge',
            'en' => ['title' => 'Applicant'],
            'ru' => ['title' => 'Абитуринту'],
        ];
        $abitur = Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 0,
            'url' => '/abitur',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Admission campaign'],
            'ru' => ['title' => 'Приемная кампания'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 1,
            'url' => '/abitur/rating',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'The rating of applicants'],
            'ru' => ['title' => 'Рейтинг абитуриентов'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 2,
            'url' => '/abitur/table',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Acceptance tableau'],
            'ru' => ['title' => 'Табло приёмка'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 3,
            'url' => '/abitur/forms',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Submission forms'],
            'ru' => ['title' => 'Формы подачи'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 4,
            'url' => '/abitur/documents',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Documents for admission'],
            'ru' => ['title' => 'Документы для поступления'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 5,
            'url' => '/abitur/rules',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Admission rules'],
            'ru' => ['title' => 'Правила приема'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 6,
            'url' => '/abitur/entrance',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Entrance tests'],
            'ru' => ['title' => 'Вступительные испытания'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 7,
            'url' => '/abitur/enrollment',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Enrollment'],
            'ru' => ['title' => 'Зачисление'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 8,
            'url' => '/abitur/hostel',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Hostel'],
            'ru' => ['title' => 'Общежитие'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 9,
            'url' => '/abitur/open-days',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Open Days'],
            'ru' => ['title' => 'Дни открытых дверей'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 10,
            'url' => '/abitur/contacts',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Contacts'],
            'ru' => ['title' => ' Контакты'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'top',
            'position' => 2,
            'url' => '/professionalitet',
            'status' => 'discharge',
            'en' => ['title' => 'FP "Professionalitet"'],
            'ru' => ['title' => 'ФП "Профессионалитет"'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'top',
            'position' => 3,
            'url' => '/legal/forms',
            'status' => 'discharge',
            'en' => ['title' => 'Appeals'],
            'ru' => ['title' => 'Обращения'],
        ];
        $forms = Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 0,
            'url' => '/legal/forms',
            'status' => 'discharge',
            'parent_id' => $forms->id,
            'en' => ['title' => 'Forms of appeals'],
            'ru' => ['title' => 'Формы обращений'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 1,
            'url' => '/legal/forms/meet',
            'status' => 'discharge',
            'parent_id' => $forms->id,
            'en' => ['title' => 'Personal reception'],
            'ru' => ['title' => 'Личный приём'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 2,
            'url' => '/legal/forms/reception',
            'status' => 'discharge',
            'parent_id' => $forms->id,
            'en' => ['title' => 'Electronic appeals'],
            'ru' => ['title' => 'Электронные обращения'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 3,
            'url' => '/legal/forms/message',
            'status' => 'discharge',
            'parent_id' => $forms->id,
            'en' => ['title' => 'Written request'],
            'ru' => ['title' => 'Письменное обращение'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 4,
            'url' => '/legal/forms/order',
            'status' => 'discharge',
            'parent_id' => $forms->id,
            'en' => ['title' => 'The procedure of appeal'],
            'ru' => ['title' => 'Порядок обжалования'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 5,
            'url' => '/legal/forms/request',
            'status' => 'discharge',
            'parent_id' => $forms->id,
            'en' => ['title' => 'Check the status of the request'],
            'ru' => ['title' => 'Проверить статус обращения'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 6,
            'url' => '/legal/forms/answer',
            'status' => 'discharge',
            'parent_id' => $forms->id,
            'en' => ['title' => 'Responses to appeals affecting the interests of an indefinite circle of persons'],
            'ru' => ['title' => 'Ответы на обращения, затрагивающие интересы неопределенного круга лиц'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'top',
            'position' => 4,
            'url' => '/legal/anti-corruption',
            'status' => 'discharge',
            'en' => ['title' => 'Anti-corruption'],
            'ru' => ['title' => 'Противодействие коррупции'],
        ];
        $anti_corruption = Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 0,
            'url' => '/legal/anti-corruption/regulatory-acts',
            'status' => 'discharge',
            'parent_id' => $anti_corruption->id,
            'en' => ['title' => 'Regulatory legal and other acts in the field of anti-corruption'],
            'ru' => ['title' => 'Нормативные правовые и иные акты в сфере противодействия коррупции'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 1,
            'url' => '/legal/anti-corruption/expertise',
            'status' => 'discharge',
            'parent_id' => $anti_corruption->id,
            'en' => ['title' => 'Anti-corruption expertise'],
            'ru' => ['title' => 'Антикоррупционная экспертиза'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 2,
            'url' => '/legal/anti-corruption/materials',
            'status' => 'discharge',
            'parent_id' => $anti_corruption->id,
            'en' => ['title' => 'Methodological materials'],
            'ru' => ['title' => 'Методические материалы'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 3,
            'url' => '/legal/anti-corruption/forms-documents',
            'status' => 'discharge',
            'parent_id' => $anti_corruption->id,
            'en' => ['title' => 'Forms of documents related to anti-corruption to be filled in'],
            'ru' => ['title' => 'Формы документов, связанные с противодействием коррупции, для заполнения'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 4,
            'url' => '/legal/anti-corruption/information-income',
            'status' => 'discharge',
            'parent_id' => $anti_corruption->id,
            'en' => ['title' => 'Information on income, expenses, property and property obligations'],
            'ru' => ['title' => 'Сведения о доходах, расходах,об имуществе и обязательствах имущественного характера'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 5,
            'url' => '/legal/anti-corruption/commission',
            'status' => 'discharge',
            'parent_id' => $anti_corruption->id,
            'en' => ['title' => 'Commission on Compliance with the Requirements for Official Conduct and Conflict of Interest Resolution'],
            'ru' => ['title' => 'Комиссия по соблюдению требований к служебному поведению и урегулированию конфликта интересов'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 6,
            'url' => '/legal/anti-corruption/feedback',
            'status' => 'discharge',
            'parent_id' => $anti_corruption->id,
            'en' => ['title' => 'Feedback for reports of corruption'],
            'ru' => ['title' => 'Обратная связь для сообщений о фактах коррупции'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 7,
            'url' => '/legal/anti-corruption/reports',
            'status' => 'discharge',
            'parent_id' => $anti_corruption->id,
            'en' => ['title' => 'Reports, reports, reviews, statistical information'],
            'ru' => ['title' => 'Доклады, отчеты, обзоры, статистическая информация'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'top',
            'position' => 5,
            'url' => '/legal/information-security',
            'status' => 'discharge',
            'en' => ['title' => 'Information security'],
            'ru' => ['title' => 'Информационная безопасность'],
        ];
        $information_security = Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 0,
            'url' => '/legal/information-security/local-acts',
            'status' => 'discharge',
            'parent_id' => $information_security->id,
            'en' => ['title' => 'Local regulations in the field of information security of students'],
            'ru' => ['title' => 'Локальные нормативные акты в сфере обеспечения информационной безопасности обучающихся'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 1,
            'url' => '/legal/information-security/regulation',
            'status' => 'discharge',
            'parent_id' => $information_security->id,
            'en' => ['title' => 'Regulatory regulation'],
            'ru' => ['title' => 'Нормативное регулирование'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 2,
            'url' => '/legal/information-security/teachers',
            'status' => 'discharge',
            'parent_id' => $information_security->id,
            'en' => ['title' => 'Teaching staff'],
            'ru' => ['title' => 'Педагогическим работникам'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 3,
            'url' => '/legal/information-security/students',
            'status' => 'discharge',
            'parent_id' => $information_security->id,
            'en' => ['title' => 'Students'],
            'ru' => ['title' => 'Обучающимся'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 4,
            'url' => '/legal/information-security/parents',
            'status' => 'discharge',
            'parent_id' => $information_security->id,
            'en' => ['title' => 'Parents (legal representatives of students)'],
            'ru' => ['title' => 'Родителям (законным представителям обучающихся)'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 5,
            'url' => '/legal/information-security/child-safe-sites',
            'status' => 'discharge',
            'parent_id' => $information_security->id,
            'en' => ['title' => 'Children\'s Safe sites'],
            'ru' => ['title' => 'Детские безопасные сайты'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'top',
            'position' => 6,
            'url' => '/legal/security',
            'status' => 'discharge',
            'en' => ['title' => 'Comprehensive security'],
            'ru' => ['title' => 'Комплексная безопасность'],
        ];
        $security = Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 0,
            'url' => '/legal/security/fire-safety',
            'status' => 'discharge',
            'parent_id' => $security->id,
            'en' => ['title' => 'Fire safety'],
            'ru' => ['title' => 'Пожарная безопасность'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 1,
            'url' => '/legal/security/safety',
            'status' => 'discharge',
            'parent_id' => $security->id,
            'en' => ['title' => 'Labor protection'],
            'ru' => ['title' => 'Охрана труда'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 2,
            'url' => '/legal/security/road-safety',
            'status' => 'discharge',
            'parent_id' => $security->id,
            'en' => ['title' => 'Road safety'],
            'ru' => ['title' => 'Дорожная безопасность'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 3,
            'url' => '/legal/security/defense',
            'status' => 'discharge',
            'parent_id' => $security->id,
            'en' => ['title' => 'GO and emergency'],
            'ru' => ['title' => 'ГО и ЧС'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'top',
            'position' => 4,
            'url' => '/legal/security/personal-data',
            'status' => 'discharge',
            'parent_id' => $security->id,
            'en' => ['title' => 'Working with personal data'],
            'ru' => ['title' => 'Работа с персональными данными'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'top',
            'position' => 7,
            'url' => '/legal/tenders',
            'status' => 'discharge',
            'en' => ['title' => 'Purchases'],
            'ru' => ['title' => 'Закупки'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'top',
            'position' => 8,
            'url' => '/legal/antiterrorist',
            'status' => 'discharge',
            'en' => ['title' => 'Anti-terrorist protection'],
            'ru' => ['title' => 'Антитеррористическая защищенность'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'top',
            'position' => 8,
            'url' => '/legal/noko',
            'status' => 'discharge',
            'en' => ['title' => 'NOKO. Independent assessment of the quality of education'],
            'ru' => ['title' => 'НОКО. Независимая оценка качества образования'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'basic',
            'position' => 0,
            'url' => '/life',
            'status' => 'discharge',
            'en' => ['title' => 'About the college'],
            'ru' => ['title' => 'О колледже'],
        ];
        $life = Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 0,
            'url' => '/sveden/history',
            'status' => 'discharge',
            'parent_id' => $life->id,
            'en' => ['title' => 'History'],
            'ru' => ['title' => 'История'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 1,
            'url' => '/life/department',
            'status' => 'discharge',
            'parent_id' => $life->id,
            'en' => ['title' => 'Departments'],
            'ru' => ['title' => 'Отделения'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 2,
            'url' => '/life/schedule',
            'status' => 'discharge',
            'parent_id' => $life->id,
            'en' => ['title' => 'Class schedule'],
            'ru' => ['title' => 'Расписание занятий'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 3,
            'url' => '/life/call-schedule',
            'status' => 'discharge',
            'parent_id' => $life->id,
            'en' => ['title' => 'Call schedule'],
            'ru' => ['title' => 'Расписание звонков'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 4,
            'url' => '/life/job',
            'status' => 'discharge',
            'parent_id' => $life->id,
            'en' => ['title' => 'Job openings'],
            'ru' => ['title' => 'Вакансии'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 5,
            'url' => '/life/reviews',
            'status' => 'discharge',
            'parent_id' => $life->id,
            'en' => ['title' => 'Reviews'],
            'ru' => ['title' => 'Отзывы'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 6,
            'url' => '/life/answer',
            'status' => 'discharge',
            'parent_id' => $life->id,
            'en' => ['title' => 'Question and answer'],
            'ru' => ['title' => 'Вопрос-ответ'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'basic',
            'position' => 1,
            'url' => '/press-center',
            'status' => 'discharge',
            'en' => ['title' => 'Press Center'],
            'ru' => ['title' => 'Пресс-центр'],
        ];
        $press_center = Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 0,
            'url' => '/press-center/news',
            'status' => 'discharge',
            'parent_id' => $press_center->id,
            'en' => ['title' => 'News'],
            'ru' => ['title' => 'Новости'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 1,
            'url' => '/press-center/announce',
            'status' => 'discharge',
            'parent_id' => $press_center->id,
            'en' => ['title' => 'Announce'],
            'ru' => ['title' => 'Объявления'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 2,
            'url' => '/press-center/photo',
            'status' => 'discharge',
            'parent_id' => $press_center->id,
            'en' => ['title' => 'Photo Gallery'],
            'ru' => ['title' => 'Фотогалерея'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 3,
            'url' => '/press-center/video',
            'status' => 'discharge',
            'parent_id' => $press_center->id,
            'en' => ['title' => 'Video Gallery'],
            'ru' => ['title' => 'Видеогалерея'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 4,
            'url' => '/press-center/identity',
            'status' => 'discharge',
            'parent_id' => $press_center->id,
            'en' => ['title' => 'Corporate identity'],
            'ru' => ['title' => 'Фирменный стиль'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'basic',
            'position' => 2,
            'url' => '/abitur',
            'status' => 'discharge',
            'en' => ['title' => 'Applicant'],
            'ru' => ['title' => 'Абитуринту'],
        ];
        $abitur = Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 0,
            'url' => '/abitur',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Admission campaign'],
            'ru' => ['title' => 'Приемная кампания'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 1,
            'url' => '/abitur/rating',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'The rating of applicants'],
            'ru' => ['title' => 'Рейтинг абитуриентов'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 2,
            'url' => '/abitur/table',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Acceptance tableau'],
            'ru' => ['title' => 'Табло приёмка'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 3,
            'url' => '/abitur/forms',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Submission forms'],
            'ru' => ['title' => 'Формы подачи'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 4,
            'url' => '/abitur/documents',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Documents for admission'],
            'ru' => ['title' => 'Документы для поступления'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 5,
            'url' => '/abitur/rules',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Admission rules'],
            'ru' => ['title' => 'Правила приема'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 6,
            'url' => '/abitur/entrance',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Entrance tests'],
            'ru' => ['title' => 'Вступительные испытания'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 7,
            'url' => '/abitur/enrollment',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Enrollment'],
            'ru' => ['title' => 'Зачисление'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 8,
            'url' => '/abitur/hostel',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Hostel'],
            'ru' => ['title' => 'Общежитие'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 9,
            'url' => '/abitur/open-days',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Open Days'],
            'ru' => ['title' => 'Дни открытых дверей'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 10,
            'url' => '/abitur/contacts',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Contacts'],
            'ru' => ['title' => ' Контакты'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'basic',
            'position' => 3,
            'url' => '/students',
            'status' => 'discharge',
            'en' => ['title' => 'Students'],
            'ru' => ['title' => 'Студентту'],
        ];
        $students = Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 0,
            'url' => '/students/portal',
            'status' => 'discharge',
            'parent_id' => $students->id,
            'en' => ['title' => 'Internal portal'],
            'ru' => ['title' => 'Внутренний портал'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 1,
            'url' => '/life/schedule',
            'status' => 'discharge',
            'parent_id' => $students->id,
            'en' => ['title' => 'Class schedule'],
            'ru' => ['title' => 'Расписание занятий'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 2,
            'url' => '/students/schedule',
            'status' => 'discharge',
            'parent_id' => $students->id,
            'en' => ['title' => 'Distance education'],
            'ru' => ['title' => 'Дистанционное обучение'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 3,
            'url' => '/students/dual',
            'status' => 'discharge',
            'parent_id' => $students->id,
            'en' => ['title' => 'Dual training'],
            'ru' => ['title' => 'Дуальное обучение'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 4,
            'url' => '/students/rekvizit',
            'status' => 'discharge',
            'parent_id' => $students->id,
            'en' => ['title' => 'Payment details'],
            'ru' => ['title' => 'Платёжные реквизиты'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 5,
            'url' => '/students/club',
            'status' => 'discharge',
            'parent_id' => $students->id,
            'en' => ['title' => 'Athletic club "ATHLETE"'],
            'ru' => ['title' => 'Спортивный клуб "АТЛЕТ"'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 6,
            'url' => '/students/media-center',
            'status' => 'discharge',
            'parent_id' => $students->id,
            'en' => ['title' => 'KTK Media Center'],
            'ru' => ['title' => 'Медиацентр КТК'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 50,
            'url' => '/legal/forms',
            'status' => 'discharge',
            'parent_id' => $students->id,
            'en' => ['title' => 'Question to the director'],
            'ru' => ['title' => 'Вопрос директору'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'basic',
            'position' => 4,
            'url' => '/teachers',
            'status' => 'discharge',
            'en' => ['title' => 'Teachers'],
            'ru' => ['title' => 'Преподавателю'],
        ];
        $teachers = Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 0,
            'url' => '/teachers/attestation',
            'status' => 'discharge',
            'parent_id' => $teachers->id,
            'en' => ['title' => 'Certification'],
            'ru' => ['title' => 'Аттестация'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 1,
            'url' => '/life/schedule',
            'status' => 'discharge',
            'parent_id' => $teachers->id,
            'en' => ['title' => 'Class schedule'],
            'ru' => ['title' => 'Расписание занятий'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 2,
            'url' => '/teachers/mentoring',
            'status' => 'discharge',
            'parent_id' => $teachers->id,
            'en' => ['title' => 'Mentoring'],
            'ru' => ['title' => 'Наставничество'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 3,
            'url' => '/teachers/school',
            'status' => 'discharge',
            'parent_id' => $teachers->id,
            'en' => ['title' => 'The school of a young teacher'],
            'ru' => ['title' => 'Школа молодого педагога'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 3,
            'url' => '/teachers/school',
            'status' => 'discharge',
            'parent_id' => $teachers->id,
            'en' => ['title' => 'The school of a young teacher'],
            'ru' => ['title' => 'Школа молодого педагога'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 4,
            'url' => '/teachers/union',
            'status' => 'discharge',
            'parent_id' => $teachers->id,
            'en' => ['title' => 'The trade union'],
            'ru' => ['title' => 'Профсоюз'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 5,
            'url' => '/teachers/employment-center',
            'status' => 'discharge',
            'parent_id' => $teachers->id,
            'en' => ['title' => 'Interaction with the employment center'],
            'ru' => ['title' => 'Взаимодействие с ЦЗН'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'basic',
            'position' => 5,
            'url' => '/graduate',
            'status' => 'discharge',
            'en' => ['title' => 'Graduates'],
            'ru' => ['title' => 'Выпускнику'],
        ];
        $graduate = Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 0,
            'url' => '/graduate',
            'status' => 'discharge',
            'parent_id' => $graduate->id,
            'en' => ['title' => 'Information for College graduates'],
            'ru' => ['title' => 'Информация для выпускников колледжа'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 1,
            'url' => '/graduate/employment-center',
            'status' => 'discharge',
            'parent_id' => $graduate->id,
            'en' => ['title' => 'Graduate Employment Center'],
            'ru' => ['title' => 'Центр трудоустройства выпускников'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'basic',
            'position' => 6,
            'url' => '/contacts',
            'status' => 'discharge',
            'en' => ['title' => 'Contacts'],
            'ru' => ['title' => 'Контакты'],
        ];
        $contacts = Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 0,
            'url' => '/contacts',
            'status' => 'discharge',
            'parent_id' => $contacts->id,
            'en' => ['title' => 'Contact information'],
            'ru' => ['title' => 'Контактная информация'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 1,
            'url' => '/contacts/control',
            'status' => 'discharge',
            'parent_id' => $contacts->id,
            'en' => ['title' => 'Contacts of the controlling organizations'],
            'ru' => ['title' => 'Контакты контролирующих организаций'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'basic',
            'position' => 2,
            'url' => '/contacts/requisites',
            'status' => 'discharge',
            'parent_id' => $contacts->id,
            'en' => ['title' => 'Details of the organization'],
            'ru' => ['title' => 'Реквизиты организации'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'menu_id' => 'footer',
            'position' => 0,
            'url' => '/sveden',
            'status' => 'discharge',
            'en' => ['title' => 'Information about the educational organization'],
            'ru' => ['title' => 'Сведения об образовательной организации'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'footer',
            'position' => 1,
            'url' => '/press-center',
            'status' => 'discharge',
            'en' => ['title' => 'Press Center'],
            'ru' => ['title' => 'Пресс-центр'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'footer',
            'position' => 2,
            'url' => '/abitur',
            'status' => 'discharge',
            'en' => ['title' => 'Applicant'],
            'ru' => ['title' => 'Абитуриенту'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'footer',
            'position' => 3,
            'url' => '/students',
            'status' => 'discharge',
            'en' => ['title' => 'Students'],
            'ru' => ['title' => 'Студенту'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'footer',
            'position' => 4,
            'url' => '/teachers',
            'status' => 'discharge',
            'en' => ['title' => 'Teachers'],
            'ru' => ['title' => 'Преподавателю'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'footer',
            'position' => 5,
            'url' => '/graduate',
            'status' => 'discharge',
            'en' => ['title' => 'Graduates'],
            'ru' => ['title' => 'Выпускникам'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'footer',
            'position' => 6,
            'url' => '/contacts',
            'status' => 'discharge',
            'en' => ['title' => 'Contacts'],
            'ru' => ['title' => 'Контакты'],
        ];
        Menu::create($data);

        $data = [
            'menu_id' => 'footer',
            'position' => 7,
            'url' => '/map',
            'status' => 'discharge',
            'en' => ['title' => 'Site map'],
            'ru' => ['title' => 'Карта сайта'],
        ];
        Menu::create($data);
        /////////////////////////////////////////////////////////////////////

    }
}
