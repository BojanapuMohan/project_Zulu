# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151113063313) do

  create_table "appointment_reminders", force: :cascade do |t|
    t.string   "d_reminder_type",            limit: 255
    t.string   "reminder_time",              limit: 255
    t.boolean  "skip_weekends",                            default: false
    t.string   "reminder_period",            limit: 255
    t.boolean  "apply_reminder_type_to_all",               default: false
    t.string   "ac_email_subject",           limit: 255
    t.text     "ac_email_content",           limit: 65535
    t.boolean  "ac_app_can_show",                          default: false
    t.boolean  "hide_address_show",                        default: false
    t.string   "reminder_email_subject",     limit: 255
    t.boolean  "reminder_email_enabled",                   default: false
    t.text     "reminder_email_content",     limit: 65535
    t.boolean  "reminder_app_can_show",                    default: false
    t.boolean  "sms_enabled",                              default: false
    t.text     "sms_text",                   limit: 65535
    t.boolean  "sms_app_can_show",                         default: false
    t.integer  "company_id",                 limit: 4
    t.datetime "created_at",                                               null: false
    t.datetime "updated_at",                                               null: false
  end

  add_index "appointment_reminders", ["company_id"], name: "index_appointment_reminders_on_company_id", using: :btree

  create_table "appointment_types", force: :cascade do |t|
    t.string   "name",                  limit: 255
    t.text     "description",           limit: 65535
    t.string   "category",              limit: 255
    t.string   "duration_time",         limit: 255,   default: "30", null: false
    t.text     "billable_item",         limit: 65535
    t.string   "default_note_template", limit: 255
    t.text     "related_product",       limit: 65535
    t.string   "color_code",            limit: 255
    t.text     "prefer_practi",         limit: 65535
    t.integer  "company_id",            limit: 4
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
    t.boolean  "confirm_email"
    t.boolean  "send_reminder"
    t.boolean  "allow_online",                        default: true
  end

  add_index "appointment_types", ["company_id"], name: "index_appointment_types_on_company_id", using: :btree

  create_table "appointment_types_users", force: :cascade do |t|
    t.integer  "appointment_type_id", limit: 4
    t.integer  "user_id",             limit: 4
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.boolean  "is_selected",                     default: false
    t.string   "first_name",          limit: 255
    t.string   "last_name",           limit: 255
  end

  add_index "appointment_types_users", ["appointment_type_id"], name: "index_appointment_types_users_on_appointment_type_id", using: :btree
  add_index "appointment_types_users", ["user_id"], name: "index_appointment_types_users_on_user_id", using: :btree

  create_table "billable_items", force: :cascade do |t|
    t.string   "item_code",        limit: 255
    t.string   "name",             limit: 255
    t.string   "price",            limit: 255
    t.boolean  "include_tax"
    t.string   "tax",              limit: 255
    t.integer  "company_id",       limit: 4
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
    t.boolean  "item_type",                      default: true
    t.text     "concession_price", limit: 65535
  end

  add_index "billable_items", ["company_id"], name: "index_billable_items_on_company_id", using: :btree

  create_table "billable_items_concessions", force: :cascade do |t|
    t.integer  "billable_item_id", limit: 4
    t.integer  "concession_id",    limit: 4
    t.string   "value",            limit: 255
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.string   "name",             limit: 255
  end

  add_index "billable_items_concessions", ["billable_item_id"], name: "index_billable_items_concessions_on_billable_item_id", using: :btree
  add_index "billable_items_concessions", ["concession_id"], name: "index_billable_items_concessions_on_concession_id", using: :btree

  create_table "businesses", force: :cascade do |t|
    t.string   "name",           limit: 255
    t.text     "address",        limit: 65535
    t.string   "web_url",        limit: 255
    t.text     "contact_info",   limit: 65535
    t.boolean  "online_booking",               default: true, null: false
    t.integer  "company_id",     limit: 4
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.string   "city",           limit: 255
    t.string   "state",          limit: 255
    t.integer  "pin_code",       limit: 4
    t.string   "country",        limit: 255
    t.string   "reg_name",       limit: 255
    t.string   "reg_number",     limit: 255
    t.integer  "practi_info_id", limit: 4
  end

  add_index "businesses", ["company_id"], name: "index_businesses_on_company_id", using: :btree

  create_table "businesses_practi_infos", force: :cascade do |t|
    t.integer  "practi_info_id", limit: 4
    t.integer  "business_id",    limit: 4
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  add_index "businesses_practi_infos", ["business_id"], name: "index_businesses_practi_infos_on_business_id", using: :btree
  add_index "businesses_practi_infos", ["practi_info_id"], name: "index_businesses_practi_infos_on_practi_info_id", using: :btree

  create_table "companies", force: :cascade do |t|
    t.string   "first_name",              limit: 255
    t.string   "last_name",               limit: 255
    t.string   "email",                   limit: 255
    t.string   "country",                 limit: 255
    t.string   "time_zone",               limit: 255
    t.string   "attendees",               limit: 255,   default: "patients",   null: false
    t.boolean  "note_letter",                           default: false,        null: false
    t.boolean  "show_finance",                          default: false,        null: false
    t.boolean  "show_attachment",                       default: false,        null: false
    t.string   "communication_email",     limit: 255
    t.text     "calendar_setting",        limit: 65535
    t.boolean  "multi_appointment",                     default: false,        null: false
    t.boolean  "show_time_indicator",                   default: true,         null: false
    t.string   "patient_name_by",         limit: 255,   default: "First Name", null: false
    t.datetime "created_at",                                                   null: false
    t.datetime "updated_at",                                                   null: false
    t.string   "company_name",            limit: 255
    t.string   "password_salt",           limit: 255
    t.string   "password_hash",           limit: 255
    t.string   "logo_image_file_name",    limit: 255
    t.string   "logo_image_content_type", limit: 255
    t.integer  "logo_image_file_size",    limit: 4
    t.datetime "logo_image_updated_at"
    t.string   "logo_file_name",          limit: 255
    t.string   "logo_content_type",       limit: 255
    t.integer  "logo_file_size",          limit: 4
    t.datetime "logo_updated_at"
  end

  create_table "concessions", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.integer  "company_id", limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "concessions", ["company_id"], name: "index_concessions_on_company_id", using: :btree

  create_table "contacts", force: :cascade do |t|
    t.string   "contact_type",    limit: 255
    t.string   "title",           limit: 255
    t.string   "first_name",      limit: 255
    t.string   "last_name",       limit: 255
    t.string   "preffered_name",  limit: 255
    t.string   "occupation",      limit: 255
    t.string   "company_name",    limit: 255
    t.string   "provider_number", limit: 255
    t.text     "phone_list",      limit: 65535
    t.string   "email",           limit: 255
    t.string   "city",            limit: 255
    t.string   "state",           limit: 255
    t.integer  "post_code",       limit: 4
    t.string   "country",         limit: 255
    t.text     "notes",           limit: 65535
    t.boolean  "status",                        default: true
    t.integer  "company_id",      limit: 4
    t.datetime "created_at",                                   null: false
    t.datetime "updated_at",                                   null: false
    t.string   "address",         limit: 255
  end

  add_index "contacts", ["company_id"], name: "index_contacts_on_company_id", using: :btree

  create_table "document_and_printings", force: :cascade do |t|
    t.string   "logo_height",       limit: 255
    t.string   "in_page_size",      limit: 255
    t.string   "in_top_margin",     limit: 255
    t.string   "as_title",          limit: 255
    t.string   "l_space_un_logo",   limit: 255
    t.string   "l_top_margin",      limit: 255
    t.string   "l_bottom_margin",   limit: 255
    t.string   "l_bleft_margin",    limit: 255
    t.string   "l_right_margin",    limit: 255
    t.string   "tn_page_size",      limit: 255
    t.string   "tn_top_margin",     limit: 255
    t.boolean  "l_display_logo",                default: true
    t.boolean  "tn_display_logo",               default: true
    t.boolean  "hide_us_cb",                    default: false
    t.integer  "company_id",        limit: 4
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
    t.string   "logo_file_name",    limit: 255
    t.string   "logo_content_type", limit: 255
    t.integer  "logo_file_size",    limit: 4
    t.datetime "logo_updated_at"
  end

  add_index "document_and_printings", ["company_id"], name: "index_document_and_printings_on_company_id", using: :btree

  create_table "expense_products", force: :cascade do |t|
    t.string   "name",            limit: 255
    t.float    "unit_cost_price", limit: 24
    t.integer  "quantity",        limit: 4
    t.integer  "expense_id",      limit: 4
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
    t.string   "prod_id",         limit: 255
    t.boolean  "status",                      default: true
  end

  add_index "expense_products", ["expense_id"], name: "index_expense_products_on_expense_id", using: :btree

  create_table "expenses", force: :cascade do |t|
    t.date     "expense_date"
    t.string   "business_name",         limit: 255
    t.string   "vendor",                limit: 255
    t.string   "category",              limit: 255
    t.float    "total_expense",         limit: 24
    t.string   "tax",                   limit: 255
    t.float    "tax_amount",            limit: 24,    default: 0.0
    t.text     "note",                  limit: 65535
    t.boolean  "include_product_price",               default: false
    t.integer  "company_id",            limit: 4
    t.datetime "created_at",                                             null: false
    t.datetime "updated_at",                                             null: false
    t.string   "status",                limit: 255,   default: "active"
    t.float    "sub_amount",            limit: 24
    t.string   "created_by",            limit: 255
  end

  add_index "expenses", ["company_id"], name: "index_expenses_on_company_id", using: :btree

  create_table "invoice_settings", force: :cascade do |t|
    t.string   "title",                       limit: 255
    t.integer  "starting_invoice_number",     limit: 4
    t.string   "extra_bussiness_information", limit: 255
    t.string   "offer_text",                  limit: 255
    t.string   "default_notes",               limit: 255
    t.boolean  "show_business_info"
    t.boolean  "hide_business_details"
    t.boolean  "include_next_appointment"
    t.boolean  "status",                                  default: true
    t.integer  "company_id",                  limit: 4
    t.datetime "created_at",                                             null: false
    t.datetime "updated_at",                                             null: false
  end

  add_index "invoice_settings", ["company_id"], name: "index_invoice_settings_on_company_id", using: :btree

  create_table "letter_templates", force: :cascade do |t|
    t.string   "template_name",         limit: 255
    t.string   "default_email_subject", limit: 255
    t.text     "template_body",         limit: 65535
    t.integer  "company_id",            limit: 4
    t.boolean  "status",                              default: true
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
  end

  add_index "letter_templates", ["company_id"], name: "index_letter_templates_on_company_id", using: :btree

  create_table "online_bookings", force: :cascade do |t|
    t.boolean  "allow_online",                          default: false
    t.text     "show_address",            limit: 65535
    t.text     "ga_code",                 limit: 65535
    t.string   "min_appointment",         limit: 255
    t.string   "advance_booking_time",    limit: 255
    t.string   "min_cancel_appoint_time", limit: 255
    t.string   "notify_by",               limit: 255
    t.boolean  "show_price",                            default: false
    t.boolean  "hide_end_time",                         default: false
    t.boolean  "req_patient_addr",                      default: false
    t.text     "time_sel_info",           limit: 65535
    t.text     "terms",                   limit: 65535
    t.integer  "company_id",              limit: 4
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
    t.string   "logo_file_name",          limit: 255
    t.string   "logo_content_type",       limit: 255
    t.integer  "logo_file_size",          limit: 4
    t.datetime "logo_updated_at"
    t.boolean  "show_dob",                              default: false
  end

  add_index "online_bookings", ["company_id"], name: "index_online_bookings_on_company_id", using: :btree

  create_table "owners", force: :cascade do |t|
    t.string   "first_name",    limit: 255
    t.string   "last_name",     limit: 255
    t.string   "email",         limit: 255
    t.string   "password_hash", limit: 255
    t.string   "password_salt", limit: 255
    t.string   "role",          limit: 255
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "patients", force: :cascade do |t|
    t.string   "title",              limit: 255
    t.string   "first_name",         limit: 255
    t.string   "last_name",          limit: 255
    t.integer  "dob_day",            limit: 4
    t.string   "dob_month",          limit: 255
    t.integer  "dob_year",           limit: 4
    t.string   "gender",             limit: 255
    t.text     "relationship",       limit: 65535
    t.string   "phone_list",         limit: 255
    t.string   "email",              limit: 255
    t.string   "reminder_type",      limit: 255
    t.boolean  "sms_marketing",                    default: false
    t.text     "address",            limit: 65535
    t.string   "country",            limit: 255
    t.string   "state",              limit: 255
    t.string   "city",               limit: 255
    t.integer  "postal_code",        limit: 4
    t.string   "concession_type",    limit: 255
    t.text     "invoice_to",         limit: 65535
    t.string   "invoice_email",      limit: 255
    t.text     "invoice_extra_info", limit: 65535
    t.string   "occupation",         limit: 255
    t.string   "emergency_contact",  limit: 255
    t.string   "medicare_number",    limit: 255
    t.string   "reference_number",   limit: 255
    t.string   "refer_doctor",       limit: 255
    t.text     "notes",              limit: 65535
    t.string   "referral_type",      limit: 255
    t.string   "referrer",           limit: 255
    t.string   "extra_info",         limit: 255
    t.text     "medical_alert",      limit: 65535
    t.boolean  "status",                           default: true
    t.integer  "company_id",         limit: 4
    t.datetime "created_at",                                       null: false
    t.datetime "updated_at",                                       null: false
    t.integer  "age",                limit: 4,     default: 0
  end

  add_index "patients", ["company_id"], name: "index_patients_on_company_id", using: :btree

  create_table "payment_settings", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.integer  "company_id", limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "payment_settings", ["company_id"], name: "index_payment_settings_on_company_id", using: :btree

  create_table "payment_types", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.integer  "company_id", limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "payment_types", ["company_id"], name: "index_payment_types_on_company_id", using: :btree

  create_table "plans", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.integer  "no_doctors", limit: 4
    t.integer  "price",      limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "owner_id",   limit: 4
    t.string   "category",   limit: 255
  end

  add_index "plans", ["owner_id"], name: "index_plans_on_owner_id", using: :btree

  create_table "practi_avails", force: :cascade do |t|
    t.string   "day_name",       limit: 255
    t.string   "start_hr",       limit: 255
    t.string   "start_min",      limit: 255
    t.string   "end_hr",         limit: 255
    t.string   "end_min",        limit: 255
    t.integer  "practi_info_id", limit: 4
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.boolean  "is_selected"
    t.text     "cust_break",     limit: 65535
    t.integer  "business_id",    limit: 4
  end

  add_index "practi_avails", ["business_id"], name: "index_practi_avails_on_business_id", using: :btree
  add_index "practi_avails", ["practi_info_id"], name: "index_practi_avails_on_practi_info_id", using: :btree

  create_table "practi_breaks", force: :cascade do |t|
    t.string   "start_hr",        limit: 255
    t.string   "start_min",       limit: 255
    t.string   "end_hr",          limit: 255
    t.string   "end_min",         limit: 255
    t.integer  "practi_avail_id", limit: 4
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "practi_breaks", ["practi_avail_id"], name: "index_practi_breaks_on_practi_avail_id", using: :btree

  create_table "practi_infos", force: :cascade do |t|
    t.string   "designation",             limit: 255
    t.text     "desc",                    limit: 65535
    t.string   "default_type",            limit: 255
    t.string   "notify_by",               limit: 255,   default: "email", null: false
    t.string   "cancel_time",             limit: 255,   default: "7",     null: false
    t.boolean  "is_online",                             default: true,    null: false
    t.integer  "user_id",                 limit: 4
    t.datetime "created_at",                                              null: false
    t.datetime "updated_at",                                              null: false
    t.text     "appointment_services",    limit: 65535
    t.boolean  "allow_external_calendar",               default: false
  end

  add_index "practi_infos", ["user_id"], name: "index_practi_infos_on_user_id", using: :btree

  create_table "practi_refers", force: :cascade do |t|
    t.string   "ref_type",       limit: 255
    t.integer  "number",         limit: 4
    t.string   "business_id",    limit: 255
    t.integer  "practi_info_id", limit: 4
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "practi_refers", ["practi_info_id"], name: "index_practi_refers_on_practi_info_id", using: :btree

  create_table "product_stocks", force: :cascade do |t|
    t.string   "stock_level", limit: 255
    t.string   "stock_type",  limit: 255
    t.integer  "quantity",    limit: 4
    t.string   "adjusted_at", limit: 255
    t.string   "adjusted_by", limit: 255
    t.text     "note",        limit: 65535
    t.integer  "product_id",  limit: 4
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  add_index "product_stocks", ["product_id"], name: "index_product_stocks_on_product_id", using: :btree

  create_table "products", force: :cascade do |t|
    t.string   "item_code",     limit: 255
    t.string   "name",          limit: 255
    t.string   "serial_no",     limit: 255
    t.string   "supplier",      limit: 255
    t.float    "price",         limit: 24
    t.float    "price_inc_tax", limit: 24
    t.float    "price_exc_tax", limit: 24
    t.string   "tax",           limit: 255
    t.float    "cost_price",    limit: 24
    t.integer  "stock_number",  limit: 4
    t.text     "note",          limit: 65535
    t.boolean  "status"
    t.integer  "company_id",    limit: 4
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "products", ["company_id"], name: "index_products_on_company_id", using: :btree

  create_table "quest_choices", force: :cascade do |t|
    t.string   "title",       limit: 255
    t.integer  "question_id", limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "quest_choices", ["question_id"], name: "index_quest_choices_on_question_id", using: :btree

  create_table "questions", force: :cascade do |t|
    t.text     "title",           limit: 65535
    t.string   "q_type",          limit: 255
    t.integer  "temp_section_id", limit: 4
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  add_index "questions", ["temp_section_id"], name: "index_questions_on_temp_section_id", using: :btree

  create_table "recall_types", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "period_name", limit: 255
    t.string   "period_val",  limit: 255
    t.integer  "company_id",  limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "recall_types", ["company_id"], name: "index_recall_types_on_company_id", using: :btree

  create_table "referral_types", force: :cascade do |t|
    t.string   "referral_source",       limit: 255
    t.text     "referral_sub_category", limit: 65535
    t.boolean  "status",                              default: true
    t.integer  "company_id",            limit: 4
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
  end

  add_index "referral_types", ["company_id"], name: "index_referral_types_on_company_id", using: :btree

  create_table "sms_credits", force: :cascade do |t|
    t.integer  "avail_sms",      limit: 4
    t.integer  "sms_setting_id", limit: 4
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  add_index "sms_credits", ["sms_setting_id"], name: "index_sms_credits_on_sms_setting_id", using: :btree

  create_table "sms_plans", force: :cascade do |t|
    t.integer  "amount",     limit: 4
    t.integer  "no_sms",     limit: 4
    t.integer  "owner_id",   limit: 4
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "sms_plans", ["owner_id"], name: "index_sms_plans_on_owner_id", using: :btree

  create_table "sms_settings", force: :cascade do |t|
    t.integer  "sms_alert_no", limit: 4
    t.string   "mob_no",       limit: 255
    t.text     "email",        limit: 65535
    t.integer  "company_id",   limit: 4
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "default_sms",  limit: 4
  end

  add_index "sms_settings", ["company_id"], name: "index_sms_settings_on_company_id", using: :btree

  create_table "subscriptions", force: :cascade do |t|
    t.string   "name",          limit: 255
    t.integer  "doctors_no",    limit: 4
    t.date     "purchase_date"
    t.integer  "cost",          limit: 4
    t.integer  "company_id",    limit: 4
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "category",      limit: 255
  end

  add_index "subscriptions", ["company_id"], name: "index_subscriptions_on_company_id", using: :btree

  create_table "tax_settings", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.integer  "amount",     limit: 4
    t.integer  "company_id", limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "tax_settings", ["company_id"], name: "index_tax_settings_on_company_id", using: :btree

  create_table "temp_sections", force: :cascade do |t|
    t.string   "name",             limit: 255
    t.integer  "template_note_id", limit: 4
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  add_index "temp_sections", ["template_note_id"], name: "index_temp_sections_on_template_note_id", using: :btree

  create_table "template_notes", force: :cascade do |t|
    t.string   "name",                  limit: 255
    t.string   "title",                 limit: 255
    t.boolean  "show_patient_addr",                 default: false, null: false
    t.boolean  "show_patient_dob",                  default: false, null: false
    t.boolean  "show_patient_medicare",             default: false, null: false
    t.boolean  "show_patient_occup",                default: false, null: false
    t.integer  "company_id",            limit: 4
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
  end

  add_index "template_notes", ["company_id"], name: "index_template_notes_on_company_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "title",         limit: 255
    t.string   "first_name",    limit: 255
    t.string   "last_name",     limit: 255
    t.string   "email",         limit: 255
    t.string   "password_hash", limit: 255
    t.string   "password_salt", limit: 255
    t.boolean  "is_doctor",                   default: false, null: false
    t.text     "phone",         limit: 65535
    t.string   "time_zone",     limit: 255
    t.boolean  "auth_factor",                 default: false, null: false
    t.string   "role",          limit: 255
    t.boolean  "acc_active",                  default: true,  null: false
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.integer  "company_id",    limit: 4
  end

  add_index "users", ["company_id"], name: "index_users_on_company_id", using: :btree

  add_foreign_key "appointment_reminders", "companies"
  add_foreign_key "appointment_types", "companies"
  add_foreign_key "billable_items", "companies"
  add_foreign_key "billable_items_concessions", "billable_items"
  add_foreign_key "billable_items_concessions", "concessions"
  add_foreign_key "businesses", "companies"
  add_foreign_key "businesses_practi_infos", "businesses"
  add_foreign_key "businesses_practi_infos", "practi_infos"
  add_foreign_key "concessions", "companies"
  add_foreign_key "contacts", "companies"
  add_foreign_key "document_and_printings", "companies"
  add_foreign_key "expense_products", "expenses"
  add_foreign_key "expenses", "companies"
  add_foreign_key "invoice_settings", "companies"
  add_foreign_key "letter_templates", "companies"
  add_foreign_key "online_bookings", "companies"
  add_foreign_key "patients", "companies"
  add_foreign_key "payment_settings", "companies"
  add_foreign_key "payment_types", "companies"
  add_foreign_key "practi_avails", "practi_infos"
  add_foreign_key "practi_breaks", "practi_avails"
  add_foreign_key "practi_infos", "users"
  add_foreign_key "practi_refers", "practi_infos"
  add_foreign_key "product_stocks", "products"
  add_foreign_key "products", "companies"
  add_foreign_key "quest_choices", "questions"
  add_foreign_key "questions", "temp_sections"
  add_foreign_key "recall_types", "companies"
  add_foreign_key "referral_types", "companies"
  add_foreign_key "sms_credits", "sms_settings"
  add_foreign_key "sms_plans", "owners"
  add_foreign_key "sms_settings", "companies"
  add_foreign_key "subscriptions", "companies"
  add_foreign_key "tax_settings", "companies"
  add_foreign_key "temp_sections", "template_notes"
  add_foreign_key "template_notes", "companies"
end
