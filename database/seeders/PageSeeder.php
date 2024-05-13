<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /////////////////////////////////////////////////////////////////////
        $data = [
            'position' => 0,
            'isFolder' => 0,
            'url' => '/',
            'status' => 'discharge',
            'siteBar' => false,
            'en' => ['title' => 'Home', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Главная', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'position' => 1,
            'isFolder' => 1,
            'url' => 'sveden',
            'status' => 'discharge',
            'siteBar' => false,
            'en' => ['title' => 'Information about the educational organization', 'text' => '[page-sveden]'],
            'ru' => ['title' => 'Сведения об образовательной организации', 'text' => '[page-sveden]'],
        ];
        $sveden = Page::create($data);

        $data = [
            'position' => 0,
            'isFolder' => 0,
            'url' => 'sveden/history',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'History', 'text' => 'Page Content...'],
            'ru' => ['title' => 'История', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 1,
            'isFolder' => 0,
            'url' => 'sveden/common',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'cardBody' => false,
            'en' => ['title' => 'Basic information', 'text' => '[page-sveden-common]'],
            'ru' => ['title' => 'Основные сведения', 'text' => '[page-sveden-common]'],
        ];
        Page::create($data);

        $data = [
            'position' => 2,
            'isFolder' => 0,
            'url' => 'sveden/struct',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'The structure and management bodies of an educational organization', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Структура и органы управления образовательной организацией', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 3,
            'isFolder' => 0,
            'url' => 'sveden/document',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Documents', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Документы', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 4,
            'isFolder' => 0,
            'url' => 'sveden/education',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Education', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Образование', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 5,
            'isFolder' => 0,
            'url' => 'sveden/eduStandarts',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Educational standards and requirements', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Образовательные стандарты и требования', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 6,
            'isFolder' => 0,
            'url' => 'sveden/guide',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Guide', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Руководство', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 7,
            'isFolder' => 0,
            'url' => 'sveden/employees',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Teaching staff', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Педагогический состав', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 8,
            'isFolder' => 0,
            'url' => 'sveden/objects',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Material and technical support and equipment of the educational process', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Материально-техническое обеспечение и оснащенность образовательного процесса', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 9,
            'isFolder' => 0,
            'url' => 'sveden/grants',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Scholarships and types of financial support', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Стипендии и виды материальной поддержки', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 10,
            'isFolder' => 0,
            'url' => 'sveden/paid_edu',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Paid educational services', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Платные образовательные услуги', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 11,
            'isFolder' => 0,
            'url' => 'sveden/budget',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Financial and economic activities', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Финансово-хозяйственная деятельность', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 12,
            'isFolder' => 0,
            'url' => 'sveden/vacant',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Vacant places for admission (transfer) of students', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Вакантные места для приема (перевода) обучающихся', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 13,
            'isFolder' => 0,
            'url' => 'sveden/inter',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'cardBody' => false,
            'en' => ['title' => 'International cooperation', 'text' => file_get_contents(__DIR__ . '/page/en/sveden-inter.html')],
            'ru' => ['title' => 'Международное сотрудничество', 'text' => file_get_contents(__DIR__ . '/page/ru/sveden-inter.html')],
        ];
        Page::create($data);

        $data = [
            'position' => 14,
            'isFolder' => 0,
            'url' => 'sveden/ovz',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'cardBody' => false,
            'en' => ['title' => 'Available environment', /*'text' => file_get_contents(__DIR__ . '/page/en/sveden-ovz.html')*/],
            'ru' => ['title' => 'Доступная среда', 'text' => file_get_contents(__DIR__ . '/page/ru/sveden-ovz.html')],
        ];
        Page::create($data);

        $data = [
            'position' => 15,
            'isFolder' => 0,
            'url' => 'sveden/nutrition',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Catering in an educational organization', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Организация питания в образовательной организации', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 16,
            'isFolder' => 0,
            'url' => 'sveden/law-map',
            'status' => 'discharge',
            'parent_id' => $sveden->id,
            'en' => ['title' => 'Legislative map', 'text' => '[page-sveden-law-map]'],
            'ru' => ['title' => 'Законодательная карта', 'text' => '[page-sveden-law-map]'],
        ];
        Page::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'position' => 3,
            'isFolder' => 1,
            'url' => 'abitur',
            'status' => 'discharge',
            'siteBar' => false,
            'isContainer' => false,
            'en' => ['title' => 'Applicant', 'text' => '[view include="abitur-banner1"]'],
            'ru' => ['title' => 'Абитуриенту', 'text' => '[view include="abitur-banner1"]'],
        ];
        $abitur = Page::create($data);

        $data = [
            'position' => 0,
            'isFolder' => 0,
            'url' => 'abitur/rating',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'The rating of applicants', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Рейтинг абитуриентов', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 1,
            'isFolder' => 0,
            'url' => 'abitur/table',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Acceptance tableau', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Табло приёмка', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 2,
            'isFolder' => 0,
            'url' => 'abitur/forms',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Submission forms', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Формы подачи', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 3,
            'isFolder' => 0,
            'url' => 'abitur/documents',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Documents for admission', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Документы для поступления', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 4,
            'isFolder' => 0,
            'url' => 'abitur/rules',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Admission rules', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Правила приема', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 5,
            'isFolder' => 0,
            'url' => 'abitur/entrance',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Entrance tests', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Вступительные испытания', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 6,
            'isFolder' => 0,
            'url' => 'abitur/enrollment',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Enrollment', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Зачисление', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 7,
            'isFolder' => 0,
            'url' => 'abitur/hostel',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Hostel', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Общежитие', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 8,
            'isFolder' => 0,
            'url' => 'abitur/open-days',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Open Days', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Дни открытых дверей', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 9,
            'isFolder' => 0,
            'url' => 'abitur/contacts',
            'status' => 'discharge',
            'parent_id' => $abitur->id,
            'en' => ['title' => 'Contacts', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Контакты', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'position' => 4,
            'isFolder' => 0,
            'url' => 'professionalitet',
            'status' => 'discharge',
            'siteBar' => false,
            'en' => ['title' => 'FP "PROFESSIONALITET"', 'text' => 'Page Content...'],
            'ru' => ['title' => 'ФП "ПРОФЕССИОНАЛИТЕТ"', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'position' => 5,
            'isFolder' => 1,
            'url' => 'legal',
            'status' => 'discharge',
            'en' => ['title' => 'Legal documents', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Правовые документы', 'text' => 'Контент страницы...'],
        ];
        $legal = Page::create($data);

        ###########
        $data = [
            'position' => 0,
            'isFolder' => 1,
            'url' => 'legal/forms',
            'status' => 'discharge',
            'parent_id' => $legal->id,
            'en' => ['title' => 'Forms of appeals', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Формы обращений', 'text' => 'Контент страницы...'],
        ];
        $forms = Page::create($data);

        $data = [
            'position' => 0,
            'isFolder' => 0,
            'url' => 'legal/forms/meet',
            'status' => 'discharge',
            'parent_id' => $forms->id,
            'en' => ['title' => 'Personal reception', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Личный приём', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 1,
            'isFolder' => 0,
            'url' => 'legal/forms/reception',
            'status' => 'discharge',
            'parent_id' => $forms->id,
            'en' => ['title' => 'Electronic appeals', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Электронные обращения', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 2,
            'isFolder' => 0,
            'url' => 'legal/forms/message',
            'status' => 'discharge',
            'parent_id' => $forms->id,
            'en' => ['title' => 'Written request', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Письменное обращение', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 3,
            'isFolder' => 0,
            'url' => 'legal/forms/order',
            'status' => 'discharge',
            'parent_id' => $forms->id,
            'en' => ['title' => 'The procedure of appeal', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Порядок обжалования', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 4,
            'isFolder' => 0,
            'url' => 'legal/forms/request',
            'status' => 'discharge',
            'parent_id' => $forms->id,
            'en' => ['title' => 'Check the status of the request', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Проверить статус обращения', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 5,
            'isFolder' => 0,
            'url' => 'legal/forms/answer',
            'status' => 'discharge',
            'parent_id' => $forms->id,
            'en' => ['title' => 'Responses to appeals affecting the interests of an indefinite circle of persons', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Ответы на обращения, затрагивающие интересы неопределенного круга лиц', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);
        ###########

        ###########
        $data = [
            'position' => 1,
            'isFolder' => 1,
            'url' => 'legal/anti-corruption',
            'status' => 'discharge',
            'parent_id' => $legal->id,
            'en' => ['title' => 'Anti-corruption', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Противодействие коррупции', 'text' => 'Контент страницы...'],
        ];
        $anti_corruption = Page::create($data);

        $data = [
            'position' => 0,
            'isFolder' => 0,
            'url' => 'legal/anti-corruption/regulatory-acts',
            'status' => 'discharge',
            'parent_id' => $anti_corruption->id,
            'en' => ['title' => 'Regulatory legal and other acts in the field of anti-corruption', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Нормативные правовые и иные акты в сфере противодействия коррупции', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 1,
            'isFolder' => 0,
            'url' => 'legal/anti-corruption/expertise',
            'status' => 'discharge',
            'parent_id' => $anti_corruption->id,
            'en' => ['title' => 'Anti-corruption expertise', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Антикоррупционная экспертиза', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 2,
            'isFolder' => 0,
            'url' => 'legal/anti-corruption/materials',
            'status' => 'discharge',
            'parent_id' => $anti_corruption->id,
            'en' => ['title' => 'Methodological materials', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Методические материалы', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 3,
            'isFolder' => 0,
            'url' => 'legal/anti-corruption/forms-documents',
            'status' => 'discharge',
            'parent_id' => $anti_corruption->id,
            'en' => ['title' => 'Forms of documents related to anti-corruption to be filled in', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Формы документов, связанные с противодействием коррупции, для заполнения', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 4,
            'isFolder' => 0,
            'url' => 'legal/anti-corruption/information-income',
            'status' => 'discharge',
            'parent_id' => $anti_corruption->id,
            'en' => ['title' => 'Information on income, expenses, property and property obligations', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Сведения о доходах, расходах,об имуществе и обязательствах имущественного характера', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 5,
            'isFolder' => 0,
            'url' => 'legal/anti-corruption/commission',
            'status' => 'discharge',
            'parent_id' => $anti_corruption->id,
            'en' => ['title' => 'Commission on Compliance with the Requirements for Official Conduct and Conflict of Interest Resolution', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Комиссия по соблюдению требований к служебному поведению и урегулированию конфликта интересов', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 6,
            'isFolder' => 0,
            'url' => 'legal/anti-corruption/feedback',
            'status' => 'discharge',
            'parent_id' => $anti_corruption->id,
            'en' => ['title' => 'Feedback for reports of corruption', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Обратная связь для сообщений о фактах коррупции', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 7,
            'isFolder' => 0,
            'url' => 'legal/anti-corruption/reports',
            'status' => 'discharge',
            'parent_id' => $anti_corruption->id,
            'en' => ['title' => 'Reports, reports, reviews, statistical information', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Доклады, отчеты, обзоры, статистическая информация', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);
        ###########

        ###########
        $data = [
            'position' => 2,
            'isFolder' => 1,
            'url' => 'legal/information-security',
            'status' => 'discharge',
            'parent_id' => $legal->id,
            'en' => ['title' => 'Information security', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Информационная безопасность', 'text' => 'Контент страницы...'],
        ];
        $information_security = Page::create($data);
        ###########

        ###########
        $data = [
            'position' => 3,
            'isFolder' => 1,
            'url' => 'legal/security',
            'status' => 'discharge',
            'parent_id' => $legal->id,
            'en' => ['title' => 'Comprehensive security', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Комплексная безопасность', 'text' => 'Контент страницы...'],
        ];
        $security = Page::create($data);
        ###########

        $data = [
            'position' => 0,
            'isFolder' => 0,
            'url' => 'legal/tenders',
            'status' => 'discharge',
            'parent_id' => $legal->id,
            'en' => ['title' => 'Purchases', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Закупки', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 1,
            'isFolder' => 0,
            'url' => 'legal/antiterrorist',
            'status' => 'discharge',
            'parent_id' => $legal->id,
            'en' => ['title' => 'Anti-terrorist protection', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Антитеррористическая защищенность', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        $data = [
            'position' => 1,
            'isFolder' => 0,
            'url' => 'legal/noko',
            'status' => 'discharge',
            'parent_id' => $legal->id,
            'en' => ['title' => 'NOKO. Independent assessment of the quality of education', 'text' => 'Page Content...'],
            'ru' => ['title' => 'НОКО. Независимая оценка качества образования', 'text' => 'Контент страницы...'],
        ];
        Page::create($data);

        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'position' => 6,
            'isFolder' => 1,
            'url' => 'life',
            'status' => 'discharge',
            'en' => ['title' => 'About the college', 'text' => 'Page Content...'],
            'ru' => ['title' => 'О колледже', 'text' => 'Контент страницы...'],
        ];
        $life = Page::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'position' => 7,
            'isFolder' => 1,
            'url' => 'press-center',
            'status' => 'discharge',
            'en' => ['title' => 'Press Center', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Пресс-центр', 'text' => 'Контент страницы...'],
        ];
        $press_center = Page::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'position' => 8,
            'isFolder' => 1,
            'url' => 'students',
            'status' => 'discharge',
            'en' => ['title' => 'Student', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Студенту', 'text' => 'Контент страницы...'],
        ];
        $press_center = Page::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'position' => 9,
            'isFolder' => 1,
            'url' => 'teachers',
            'status' => 'discharge',
            'en' => ['title' => 'Teacher', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Преподавателю', 'text' => 'Контент страницы...'],
        ];
        $press_center = Page::create($data);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        $data = [
            'position' => 10,
            'isFolder' => 1,
            'url' => 'contacts',
            'status' => 'discharge',
            'en' => ['title' => 'Contact information', 'text' => 'Page Content...'],
            'ru' => ['title' => 'Контактная информация', 'text' => 'Контент страницы...'],
        ];
        $contacts = Page::create($data);
        /////////////////////////////////////////////////////////////////////
    }
}
